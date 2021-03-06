﻿using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Persistance.Repository
{
    public interface IServiceRepository : IRepository<Service, int>
    {
        IEnumerable<Service> GetAll(int pageIndex, int pageSize);
        Service GetServiceWithVehicles(int id);
        Service GetWithItemsAndPricelists(int id);
        Service GetWithPricelists(int id);
        Service GetServiceWithVehiclesAndPricelists(int serviceId);
    }
}
