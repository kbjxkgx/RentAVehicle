using RentApp.Models.Entities;
using RentApp.Persistance.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace RentApp.Controllers
{
    public class CommentController : ApiController
    {
        private IUnitOfWork db;

        public CommentController(IUnitOfWork context)
        {
            db = context;
        }

        // GET: api/Services
        [AllowAnonymous]
        public IEnumerable<Comment> GetComments()
        {
            return db.Comments.GetAll();
        }

        // GET: api/Services/5
        [ResponseType(typeof(Comment))]
        [AllowAnonymous]
        public IHttpActionResult GetComment(int id)
        {
            Comment item = db.Comments.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "AppUser")]
        public IHttpActionResult PutComment(int id, Comment item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }

            string username = User.Identity.Name;
            RAIdentityUser RAUser = db.Users.Get(username);

            if (RAUser == null)
            {
                return BadRequest();
            }
            AppUser appUser = db.AppUsers.Get(RAUser.AppUserId);
            if (appUser.Id != item.UserId)
            {
                return BadRequest();
            }

            Comment comment = db.Comments.Get(item.Id);
            comment.Content = item.Content;
            db.Comments.Update(comment);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = comment.Id }, comment);
        }

        // POST: api/Services
        [ResponseType(typeof(Comment))]
        [Authorize(Roles = "AppUser")]
        public IHttpActionResult PostComment(Comment item)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string username = User.Identity.Name;
            RAIdentityUser RAUser = db.Users.Get(username);
            if (RAUser == null)
            {
                return BadRequest();
            }
            AppUser appUser = db.AppUsers.Get(RAUser.AppUserId);
            if (appUser.Id != item.UserId)
            {
                return BadRequest();
            }

            Comment comment = db.Comments.GetCommentOfUser(item.UserId);
            if (comment != null)
            {
                return BadRequest("You can comment only once.");
            }

            List<Reservation> reservations = db.Reservations.GetAllReservationsOfUser(appUser.Id).ToList();
            if (reservations.Count == 0)
            {
                return BadRequest("You can comment only after first finished reservation.");
            }

            foreach (Reservation reservation in reservations)
            {
                if (reservation.EndTime < DateTime.Now.Date)
                {
                    db.Comments.Add(item);
                    db.Complete();

                    return CreatedAtRoute("DefaultApi", new { id = item.Id }, item);
                }
            }

            return BadRequest("You can comment only after first finished reservation.");
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(Comment))]
        [Authorize(Roles ="AppUser")]
        public IHttpActionResult DeleteComment(int id)
        {
            Comment item = db.Comments.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            string username = User.Identity.Name;
            RAIdentityUser RAUser = db.Users.Get(username);
            AppUser appUser = db.AppUsers.Get(RAUser.AppUserId);
            
            if (item.UserId != appUser.Id)
            {
                return BadRequest("You are not authorized.");
            }

            db.Comments.Remove(item);
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

        private bool CommentExists(int id)
        {
            Comment item = db.Comments.Get(id);
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
