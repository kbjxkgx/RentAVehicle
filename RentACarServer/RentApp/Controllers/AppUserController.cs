using Microsoft.AspNet.Identity.EntityFramework;
using RentApp.Helper;
using RentApp.Hubs;
using RentApp.Models.Entities;
using RentApp.Persistance.UnitOfWork;
using RentApp.Services;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace RentApp.Controllers
{
    public class AppUserController : ApiController
    {
        private IUnitOfWork db;

        public AppUserController(IUnitOfWork context)
        {
            db = context;
        }

        // GET: api/AppUsers
        public IEnumerable<AppUser> GetAppUsers()
        {
            return db.AppUsers.GetAll();
        }

        [HttpGet]
        [Route("api/AppUsers/UnconfirmedUsers")]
        public IEnumerable<AppUser> UnconfirmedUsers()
        {
            return db.AppUsers.GetAll().Where(user=>user.IsUserConfirmed==false);
        }

        [HttpGet]
        [Route("api/AppUsers/getManagers")]
        public IEnumerable<AppUser> GetManagers()
        {
            List<AppUser> users = new List<AppUser>();
            foreach (RAIdentityUser user in db.Users.GetAll())
            {
                foreach (var userRole in user.Roles)
                {
                    if (userRole.RoleId == "a3807ce4-b4b3-4475-a951-9038944daab6")
                    {
                        users.Add(db.AppUsers.Get(user.AppUserId));
                    }
                }
            }
            return users;
        }


        // GET: api/Services/5
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult GetAppUser(int id)
        {
            AppUser appUser = db.AppUsers.Get(id);
            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }

        // GET: api/Services/5
        [HttpGet]
        [Route("api/AppUser/GetAppUserByUsername")]
        [ResponseType(typeof(AppUser))]
        public HttpResponseMessage GetAppUserByUsername(string Username)
        {
            try
            {
                RAIdentityUser RAUser = db.Users.Get(Username);
                AppUser user = db.AppUsers.Get(RAUser.AppUserId);
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

        }

        //GET: api/Services/5
        [Route("api/AppUser/VerifyUser")]
        [HttpPost]
        [ResponseType(typeof(AppUser))]
        public async Task<HttpResponseMessage> VerifyAppUser()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            
            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);
            
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
                string userId = provider.FormData.GetValues("Id")[0];
                RAIdentityUser RAUser = db.Users.Get(userId);
                AppUser user = db.AppUsers.Get(RAUser.AppUserId);
                MultipartFileData file = provider.FileData[0];
                string destinationFilePath = HttpContext.Current.Server.MapPath("~/Content/Images/UserIdPhotos/");
                destinationFilePath += user.Id + ".jpg";
                if (File.Exists(destinationFilePath))
                {
                    File.Delete(destinationFilePath);
                }
                File.Copy(file.LocalFileName, destinationFilePath);
                File.Delete(file.LocalFileName);
                user.PicturePath = @"Content/Images/UserIdPhotos/" + user.Id + ".jpg";
                db.AppUsers.Update(user);

                Notification notification = new Notification();
                notification.Seen = false;
                notification.Text = "Added new user:" + user.FullName + " " + user.LastName + ", check users for confirmation!";
                db.Notifications.Add(notification);

                db.Complete();
                NotificationHub.Notify(notification);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        [Authorize]
        public IHttpActionResult PutAppUser(int id, AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appUser.Id)
            {
                return BadRequest();
            }
            db.AppUsers.Update(appUser);

            string username = User.Identity.Name;
            RAIdentityUser RAUser = db.Users.GetAll().First(u => u.UserName == username);
            AppUser AppUser = db.AppUsers.Get(RAUser.AppUserId);
            if (AppUser.Id != id)
            {
                return BadRequest("You are not authorized.");
            }

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpPut]
        [Route("api/AppUser/ConfirmToggleManager/{managerId}")]
        public IHttpActionResult ConfirmManager(int managerId)
        {
            AppUser manager = db.AppUsers.Get(managerId);

            if (manager == null)
            {
                return NotFound();
            }

            manager.IsManagerAllowed = !manager.IsManagerAllowed;
            db.Complete();
            SmtpService smtpService = new SmtpService();
            string mailBody = "Manager " + manager.FullName + " Id:" + manager.Id + " is confirmed.";
            RAIdentityUser RAUser = db.Users.GetByAppUserId(manager.Id);
            smtpService.SendMail("User confirmation", mailBody, RAUser.Email);
            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpPut]
        [Route("api/AppUser/ConfirmUser/{userId}")]
        public IHttpActionResult ConfirmUser(int userId)
        {
            AppUser user = db.AppUsers.Get(userId);

            if (user == null)
            {
                return NotFound();
            }

            user.IsManagerAllowed = true;
            db.Complete();

            SmtpService smtpService = new SmtpService();
            string mailBody = "User " + user.FullName + " Id:" + user.Id + " is confirmed.";
            RAIdentityUser RAUser = db.Users.GetByAppUserId(user.Id);
            smtpService.SendMail("User confirmation", mailBody, RAUser.Email);
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Services
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult PostAppUser(AppUser appUser)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.AppUsers.Add(appUser);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = appUser.Id }, appUser);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult DeleteAppUser(int id)
        {
            AppUser appUser = db.AppUsers.Get(id);
            if (appUser == null)
            {
                return NotFound();
            }

            db.AppUsers.Remove(appUser);
            db.Complete();

            return Ok(appUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppUserExists(int id)
        {
            AppUser appUser = db.AppUsers.Get(id);
            if (appUser == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
