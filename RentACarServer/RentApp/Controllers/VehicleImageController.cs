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
