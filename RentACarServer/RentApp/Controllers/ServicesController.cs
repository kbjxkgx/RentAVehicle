﻿using System;
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
using System.Threading.Tasks;
using System.Web;
using System.IO;

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
            service.IsConfirmed = false;
            
            db.Services.Add(service);
            
            db.Complete();

            Pricelist pricelist = new Pricelist();
            pricelist.PricelistServiceId = service.Id;
            pricelist.BeginTime = DateTime.Now;
            pricelist.EndTime = DateTime.Now;
            db.Pricelists.Add(pricelist);

            Notification notification = new Notification();
            notification.Seen = false;
            notification.Text = "Added new service:" + service.Name + " " + service.Email + ", check services for confirmation!";
            db.Notifications.Add(notification);
            db.Complete();

            NotificationHub.Notify(notification);

            return CreatedAtRoute("DefaultApi", new { id = service.Id }, service);
        }

        [HttpGet]
        [Route("api/Services/getVehicles")]
        [ResponseType(typeof(List<Vehicle>))]
        public HttpResponseMessage getServiceVehicles(string Id)
        {

            try
            {
                int id = Int32.Parse(Id);
                Service service = db.Services.GetServiceWithVehicles(id);
                return Request.CreateResponse(HttpStatusCode.OK, service.Vehicles);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

        }

        [Route("api/Service/UploadImage")]
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
                string serviceId = provider.FormData.GetValues("Id")[0];
                int id = Int32.Parse(serviceId);
                Service service = db.Services.Get(id);
                MultipartFileData file = provider.FileData[0];
                string destinationFilePath = HttpContext.Current.Server.MapPath("~/Content/Images/ServiceImages/");
                destinationFilePath += serviceId + ".jpg";
                if (File.Exists(destinationFilePath))
                {
                    File.Delete(destinationFilePath);
                }
                File.Copy(file.LocalFileName, destinationFilePath);
                File.Delete(file.LocalFileName);
                service.LogoImagePath = @"Content/Images/ServiceImages/" + serviceId + ".jpg";
                db.Services.Update(service);
                db.Complete();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

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
            string destinationFilePath = HttpContext.Current.Server.MapPath("~/");
            destinationFilePath += service.LogoImagePath;
            if (File.Exists(destinationFilePath))
            {
                File.Delete(destinationFilePath);
            }
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