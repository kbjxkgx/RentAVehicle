﻿using Microsoft.AspNet.Identity.EntityFramework;
using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance
{
    public class RADBContext : IdentityDbContext<RAIdentityUser>
    {
        public virtual DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationType> NotificationTypes { get; set; }
        public DbSet<Pricelist> Pricelists { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<VehicleImage> VehicleImages { get; set; }
        
        public RADBContext() : base("name=RADB")
        {
        }
        
        public static RADBContext Create()
        {
            return new RADBContext();
        }
    }
}