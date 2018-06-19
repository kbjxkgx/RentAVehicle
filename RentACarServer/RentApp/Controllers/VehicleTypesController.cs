using RentApp.Models.Entities;
using RentApp.Persistance.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RentApp.Controllers
{
    public class VehicleTypesController : ApiController
    {
        private IUnitOfWork db;

        public VehicleTypesController(IUnitOfWork context)
        {
            db = context;
        }

        // GET: api/Services
        public IEnumerable<VehicleType> GetVehicleTypes()
        {
            return db.VehicleTypes.GetAll();
        }
        
    }
}
