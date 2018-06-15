using RentApp.Helper;
using RentApp.Models.Entities;
using RentApp.Persistance.Repository;
using RentApp.Persistance.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace RentApp.Controllers
{
    public class VehicleController : ApiController
    {
        private IUnitOfWork db;

        public VehicleController(IUnitOfWork context)
        {
            db = context;
        }
        
        // GET: api/Services
        public IEnumerable<VehicleDTO> GetVehicles()
        {
            List<VehicleDTO> vehiclesDTO = new List<VehicleDTO>();
            IEnumerable<Vehicle> vehicles  = db.Vehicles.GetAll();
            foreach (Vehicle vehicle in vehicles)
            {
                Service service = db.Services.Get(vehicle.VehicleServiceId);
                List<Pricelist> priceLists = db.Pricelists.GetAll().ToList();
                VehicleDTO vehicleDTO = new VehicleDTO(vehicle);
                if (priceLists.Count > 0)
                {
                    Pricelist actualPriceList = priceLists[0];
                    foreach (Pricelist pricelist in priceLists.Where(p=> p.PricelistServiceId == vehicle.VehicleServiceId))
                    {
                        if (pricelist.EndTime > actualPriceList.EndTime)
                        {
                            actualPriceList = pricelist;
                        }
                    }

                    Item item = db.Items.GetAll().First(i => i.ItemVehicleId == vehicle.Id && i.ItemPriceListId == actualPriceList.Id);
                    vehicleDTO.PricePerHour = item.Price;
                }
                else
                {
                    vehicleDTO.PricePerHour = 0;
                }
                vehiclesDTO.Add(vehicleDTO);
            }

            return vehiclesDTO;
        }

        // GET: api/Services/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(int id)
        {
            Vehicle vehicle = db.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // GET: api/Services/5
        [ResponseType(typeof(int))]
        public IHttpActionResult GetVehiclePrice(int id)
        {
            Vehicle vehicle = db.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(int id, Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.Id)
            {
                return BadRequest();
            }
            db.Vehicles.Update(vehicle);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult PostVehicle(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Vehicles.Add(vehicle);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = vehicle.Id }, vehicle);
        }


        

        // DELETE: api/Services/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int id)
        {
            Vehicle vehicle = db.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            db.Vehicles.Remove(vehicle);
            db.Complete();

            return Ok(vehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleExists(int id)
        {
            Vehicle vehicle = db.Vehicles.Get(id);
            if (vehicle == null)
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
