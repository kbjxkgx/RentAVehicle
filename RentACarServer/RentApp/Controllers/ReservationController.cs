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
    public class ReservationController : ApiController
    {
        private static object reservationLockObject = new object();
        private IUnitOfWork db;

        public ReservationController(IUnitOfWork context)
        {
            db = context;
        }

        [Authorize(Roles = "AppUser, Manager, Admin")]
        // GET: api/Services
        public IEnumerable<Reservation> GetReservations()
        {
            return db.Reservations.GetAll();
        }

        // GET: api/Services/5
        [ResponseType(typeof(Reservation))]
        [Authorize(Roles = "AppUser, Manager, Admin")]
        public IHttpActionResult GetReservation(int id)
        {
            Reservation reservation = db.Reservations.Get(id);
            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        [HttpGet]
        [Route("api/Reservations/GetReservationsOfVehicle/{vehicleId}")]
        [Authorize(Roles = "AppUser, Manager, Admin")]
        public IEnumerable<Reservation> GetReservationsOfVehicle(int vehicleId)
        {
            return db.Reservations.GetAllReservationsOfVehicle(vehicleId);
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "AppUser")]
        public IHttpActionResult PutReservation(int id, Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reservation.Id)
            {
                return BadRequest();
            }
            db.Reservations.Update(reservation);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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
        [ResponseType(typeof(Reservation))]
        [Authorize(Roles = "AppUser")]
        public IHttpActionResult PostReservation(Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                      
            Vehicle vehicle = db.Vehicles.Get(reservation.ReservedVehicleId);
            if (vehicle.IsAvailable==false)
            {
                return BadRequest("Vehicle not available.");
            }

            if (reservation.BeginTime > reservation.EndTime)
            {
                return BadRequest("Begin time need to be before end time.");
            }

            if (reservation.BeginTime < DateTime.Now.Date || reservation.EndTime < DateTime.Now.Date)
            {
                return BadRequest("Begin and end time should be after today.");
            }

            lock (reservationLockObject)
            {
                List<Reservation> reservations = db.Reservations.GetAllReservationsOfVehicle(reservation.ReservedVehicleId).ToList();
                foreach (Reservation r in reservations)
                {
                    if (reservation.BeginTime >= r.BeginTime && reservation.BeginTime <= r.EndTime)
                    {
                        return BadRequest("Vehicle is reserved in this period, try different time period.");
                    }
                    if (reservation.EndTime >= r.BeginTime && reservation.EndTime <= r.EndTime)
                    {
                        return BadRequest("Vehicle is reserved in this period, try different time period.");
                    }

                    if (reservation.BeginTime < r.BeginTime && reservation.EndTime > r.EndTime)
                    {
                        return BadRequest("Vehicle is reserved in this period, try different time period.");
                    }
                }
                db.Reservations.Add(reservation);
                db.Complete();
            }
            return CreatedAtRoute("DefaultApi", new { id = reservation.Id }, reservation);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(Reservation))]
        [Authorize(Roles = "AppUser, Manager, Admin")]
        public IHttpActionResult DeleteReservation(int id)
        {
            Reservation reservation = db.Reservations.Get(id);
            if (reservation == null)
            {
                return NotFound();
            }

            db.Reservations.Remove(reservation);
            db.Complete();

            return Ok(reservation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReservationExists(int id)
        {
            Reservation reservation = db.Reservations.Get(id);
            if (reservation == null)
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
