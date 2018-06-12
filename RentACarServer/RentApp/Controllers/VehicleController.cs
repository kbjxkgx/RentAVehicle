using RentApp.Helper;
using RentApp.Models.Entities;
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
    [RequireHttps]
    public class VehicleController : ApiController
    {
        private IUnitOfWork db;

        public VehicleController(IUnitOfWork context)
        {
            db = context;
        }
        
        // GET: api/Services
        public IEnumerable<Vehicle> GetVehicles()
        {
            return db.Vehicles.GetAll();
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


        [Route("api/Vehicle/AddVehicle")]
        [HttpPost]
        [ResponseType(typeof(AppUser))]
        public async Task<HttpResponseMessage> AddVehicle(Vehicle vehicle)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

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
