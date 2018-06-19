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
        public IEnumerable<Comment> GetComments()
        {
            return db.Comments.GetAll();
        }

        // GET: api/Services/5
        [ResponseType(typeof(Comment))]
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
            db.Comments.Update(item);

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

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Services
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(Comment item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comments.Add(item);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = item.Id }, item);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(int id)
        {
            Comment item = db.Comments.Get(id);
            if (item == null)
            {
                return NotFound();
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
