using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class ServiceRepository : Repository<Service, int>, IServiceRepository
    {
        public ServiceRepository(DbContext context) : base(context)
        {
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }

        public IEnumerable<Service> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.Services.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        public IEnumerable<Service> GetAll()
        {
            return context.Set<Service>().Include("Pricelists").ToList();
        }

        //public Service Get(int id)
        //{
        //    context.Set<Service>().
        //    IDbSet<Service> ser = context.Set<Service>().Include("Pricelists");
        //    return ser.Find(id);
        //}
    }
}