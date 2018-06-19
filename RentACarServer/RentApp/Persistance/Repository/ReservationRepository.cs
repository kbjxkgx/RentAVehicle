using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class ReservationRepository : Repository<Reservation, int>, IReservationRepository
    {
        public ReservationRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Reservation> GetAllReservationsOfVehicle(int vehicleId)
        {
            return RADBContext.Reservations.Where( r => r.ReservedVehicleId == vehicleId);
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}