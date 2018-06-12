using RentApp.Helper;
using RentApp.Models.Entities;
using RentApp.Persistance.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
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
    [RequireHttps]
    public class VehicleImageController : ApiController
    {
        private IUnitOfWork db;

        public VehicleImageController(IUnitOfWork context)
        {
            db = context;
        }

        // GET: api/Services
        public IEnumerable<VehicleImage> GetVehicleImages()
        {
            return db.VehicleImages.GetAll();
        }

        // GET: api/Services/5
        [ResponseType(typeof(VehicleImage))]
        public IHttpActionResult GetVehicleImage(int id)
        {
            VehicleImage item = db.VehicleImages.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicleImage(int id, VehicleImage item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }
            db.VehicleImages.Update(item);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleImageExists(id))
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

        [Route("api/VehicleImage/AddVehicleImages")]
        [HttpPost]
        [ResponseType(typeof(AppUser))]
        public async Task<HttpResponseMessage> AddVehicleImages()
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
                int vehicleId = Int32.Parse(provider.FormData.GetValues("vehicleId")[0]);
                //MultipartFileData file = provider.FileData[0];
                int i = 0;
                string destinationFolderPath = HttpContext.Current.Server.MapPath("~/Content/Images/VehicleImages/" + vehicleId);
                if (!Directory.Exists(destinationFolderPath))
                {
                    Directory.CreateDirectory(destinationFolderPath);
                }
                foreach (MultipartFileData file in provider.FileData)
                {
                    string destinationFilePath = destinationFolderPath+ "/"+ i + ".jpg";
                    if (File.Exists(destinationFilePath))
                    {
                        File.Delete(destinationFilePath);
                    }
                    File.Copy(file.LocalFileName, destinationFilePath);
                    File.Delete(file.LocalFileName);
                    VehicleImage image = new VehicleImage();
                    image.VehicleImageVehicleId = vehicleId; 
                    image.ImagePath = @"http://localhost:51680/Content/Images/VehicleImages/" + i + ".jpg";
                    db.VehicleImages.Add(image);
                    db.Complete();
                    i++;
                }
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

            //try
            //{
            //    await Request.Content.ReadAsMultipartAsync(provider);
            //    string userId = provider.FormData.GetValues("Id")[0];
            //    MultipartFileData file = provider.FileData[0];
            //    string destinationFilePath = HttpContext.Current.Server.MapPath("~/Content/Images/UserIdPhotos/");
            //    destinationFilePath += user.Id + ".jpg";
            //    if (File.Exists(destinationFilePath))
            //    {
            //        File.Delete(destinationFilePath);
            //    }
            //    File.Copy(file.LocalFileName, destinationFilePath);
            //    File.Delete(file.LocalFileName);
            //    user.PicturePath = @"http://localhost:51680/Content/Images/UserIdPhotos/" + user.Id + ".jpg";
            //    db.AppUsers.Update(user);
            //    db.Complete();
            //    return Request.CreateResponse(HttpStatusCode.OK);
            //}
            //catch (System.Exception e)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            //}
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST: api/Services
        [ResponseType(typeof(VehicleImage))]
        public IHttpActionResult PostVehicleImage(VehicleImage item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.VehicleImages.Add(item);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = item.Id }, item);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(VehicleImage))]
        public IHttpActionResult DeleteVehicleImage(int id)
        {
            VehicleImage item = db.VehicleImages.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            db.VehicleImages.Remove(item);
            db.Complete();

            return Ok(item);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleImageExists(int id)
        {
            VehicleImage item = db.VehicleImages.Get(id);
            if (item == null)
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
