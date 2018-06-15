using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RentApp.Helper;
using RentApp.Models.Entities;
using RentApp.Persistance;
using RentApp.Persistance.UnitOfWork;
using RentApp.Hubs;

namespace RentApp.Controllers
{
    public class ServicesController : ApiController
    {
        private IUnitOfWork db;

        public ServicesController(IUnitOfWork context)
        {
            db = context;
        }

        // GET: api/Services
        public IEnumerable<Service> GetServices()
        {
            List<Service> services = db.Services.GetAll().ToList();
            IEnumerable<Comment> comments = db.Comments.GetAll().ToList();
            IEnumerable<AppUser> users = db.AppUsers.GetAll();

            return db.Services.GetAll();
        }

        [HttpGet]
        [Route("api/Services/UnconfirmedServices")]
        public IEnumerable<Service> GetUnconfirmedServices()
        {
            return db.Services.GetAll().Where(service => service.IsConfirmed == false);
        }

        [HttpGet]
        [Route("api/Services/ConfirmedServices")]
        public IEnumerable<Service> GetConfirmedServices()
        {
            return db.Services.GetAll().Where(service => service.IsConfirmed == true);
        }

        // GET: api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult GetService(int id)
        {
            Service service = db.Services.Get(id);
            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutService(int id, Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != service.Id)
            {
                return BadRequest();
            }
            db.Services.Update(service);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(id))
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
        [ResponseType(typeof(Service))]
        public IHttpActionResult PostService(Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Services.Add(service);

            Notification notification = new Notification();
            notification.Seen = false;
            notification.Text = "Added new service:" + service.Name + " " + service.Email + ", check services for confirmation!";
            db.Notifications.Add(notification);

            db.Complete();

            NotificationHub.Notify(notification);

            return CreatedAtRoute("DefaultApi", new { id = service.Id }, service);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult DeleteService(int id)
        {
            Service service = db.Services.Get(id);
            if (service == null)
            {
                return NotFound();
            }

            db.Services.Remove(service);
            db.Complete();

            return Ok(service);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ServiceExists(int id)
        {
            Service branch = db.Services.Get(id);
            if (branch == null)
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