using RentApp.Helper;
using RentApp.Models.Entities;
using RentApp.Persistance.Repository;
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
            string name = User.Identity.Name;
            List<VehicleDTO> vehiclesDTO = new List<VehicleDTO>();
            IEnumerable<Vehicle> vehicles  = db.Vehicles.GetAll();
            foreach (Vehicle vehicle in vehicles)
            {
                Service service = db.Services.GetWithItemsAndPricelists(vehicle.VehicleServiceId);
                VehicleDTO vehicleDTO = new VehicleDTO(vehicle);
                if (service.Pricelists.Count > 0)
                {
                    Pricelist actualPriceList = service.Pricelists[0];
                    foreach (Pricelist pricelist in service.Pricelists.Where(p => p.BeginTime <= DateTime.Now.Date))
                    {
                        if (pricelist.EndTime > actualPriceList.EndTime)
                        {
                            actualPriceList = pricelist;
                        }
                    }
                    try
                    {
                        Item item = actualPriceList.Items.First(i => i.ItemVehicleId == vehicle.Id);
                        vehicleDTO.PricePerHour = item.Price;
                    }
                    catch (Exception e)
                    {
                        vehicleDTO.PricePerHour = 0;
                    }
                }
                else
                {
                    vehicleDTO.PricePerHour = 0;
                }
                vehiclesDTO.Add(vehicleDTO);
            }

            return vehiclesDTO;
        }

        
        [HttpGet]
        [Route("api/Vehicles/GetVehiclesPage/{pageIndex}")]
        public IEnumerable<VehicleDTO> GetVehiclesPage(int pageIndex)
        {
            string name = User.Identity.Name;
            List<VehicleDTO> vehiclesDTO = new List<VehicleDTO>();
            IEnumerable<Vehicle> vehicles = db.Vehicles.GetVehiclePageWithImages(pageIndex, 4);
            foreach (Vehicle vehicle in vehicles)
            {
                Service service = db.Services.GetWithItemsAndPricelists(vehicle.VehicleServiceId);
                VehicleDTO vehicleDTO = new VehicleDTO(vehicle);
                if (service.Pricelists.Count > 0)
                {
                    Pricelist actualPriceList = service.Pricelists[0];
                    foreach (Pricelist pricelist in service.Pricelists.Where(p => p.BeginTime <= DateTime.Now.Date))
                    {
                        if (pricelist.EndTime > actualPriceList.EndTime)
                        {
                            actualPriceList = pricelist;
                        }
                    }
                    try
                    {
                        Item item = actualPriceList.Items.First(i => i.ItemVehicleId == vehicle.Id);
                        vehicleDTO.PricePerHour = item.Price;
                    }
                    catch (Exception e)
                    {
                        vehicleDTO.PricePerHour = 0;
                    }
                }
                else
                {
                    vehicleDTO.PricePerHour = 0;
                }
                vehiclesDTO.Add(vehicleDTO);
            }

            return vehiclesDTO;
        }

        [HttpGet]
        [Route("api/Vehicles/GetVehiclesCount")]
        public int GetVehiclesCount()
        {
            return db.Vehicles.Count();
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
        public IHttpActionResult PostVehicle(VehicleDTO vehicleDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Vehicle vehicle = new Vehicle();
            vehicle.Description = vehicleDTO.Description;
            vehicle.Id = vehicleDTO.Id;
            vehicle.IsAvailable = vehicleDTO.IsAvailable;
            vehicle.Manufacturer = vehicleDTO.Manufacturer;
            vehicle.Model = vehicleDTO.Model;
            vehicle.TypeId = vehicleDTO.TypeId;
            vehicle.VehicleServiceId = vehicleDTO.VehicleServiceId;
            vehicle.YearOfProduction = vehicleDTO.YearOfProduction;

            Item item = new Item();
            item.ItemVehicleId = vehicle.Id;
            Service service = db.Services.GetWithPricelists(vehicle.VehicleServiceId);
            Pricelist actualPricelist = service.Pricelists[0];
            foreach (Pricelist pricelist in service.Pricelists.Where(p => p.BeginTime <= DateTime.Now.Date))
            {
                if (pricelist.EndTime > actualPricelist.EndTime)
                {
                    actualPricelist = pricelist;
                }
            }
            item.ItemPriceListId = actualPricelist.Id;
            item.Price = vehicleDTO.PricePerHour;
            db.Vehicles.Add(vehicle);
            db.Items.Add(item);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = vehicle.Id }, vehicle);
        }


        

        // DELETE: api/Services/5
        [ResponseType(typeof(Vehicle))]
        [Authorize(Roles ="Manager")]
        public IHttpActionResult DeleteVehicle(int id)
        {
            string username = User.Identity.Name;
            RAIdentityUser RAUser = db.Users.GetAll().First(u => u.UserName == username);
            AppUser appUser = db.AppUsers.Get(RAUser.AppUserId);

            Vehicle vehicle = db.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            Service service = db.Services.Get(vehicle.VehicleServiceId);
            if (service.ServiceManagerId != appUser.Id)
            {
                return BadRequest("You are not authorized.");
            }

            db.Vehicles.Remove(vehicle);

            List<VehicleImage> images = db.VehicleImages.GetAll().Where(vi => vi.VehicleImageVehicleId == id).ToList();

            DirectoryInfo directory = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/Content/Images/VehicleImages/") + id);
            directory.Delete(true);
            db.Vehicles.Remove(vehicle);

            db.Complete();
            
            return Ok(vehicle);
        }

        
        //[Route("api/Vehicle/DeleteVehicleWithServiceId")]
        //[HttpDelete]
        //[ResponseType(typeof(Vehicle))]
        //public IHttpActionResult DeleteVehicleWithServiceId(int serviceId)
        //{
        //    List<Vehicle> vehicles = db.Vehicles.GetAll().Where(t=>t.VehicleServiceId==serviceId).ToList();
        //    if (vehicles == null)
        //    {
        //        return NotFound();
        //    }

        //    foreach(Vehicle vehicle in vehicles)
        //    {
        //        db.Vehicles.Remove(vehicle);
        //        foreach (VehicleImage image in vehicle.Images)
        //        {
        //            string destinationFilePath = HttpContext.Current.Server.MapPath("~/");
        //            destinationFilePath += image.ImagePath;
        //            if (File.Exists(destinationFilePath))
        //            {
        //                File.Delete(destinationFilePath);
        //            }
        //        }
        //    }
            
        //    db.Complete();

        //    return Ok();
        //}


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
