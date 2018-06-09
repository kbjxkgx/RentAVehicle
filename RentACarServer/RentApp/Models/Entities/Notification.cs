using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        [Required]
        public bool Seen { get; set; }
        /// <summary>
        /// Id koji hoces da dodas u zavisnosti od tipa notifikacije(user, servis)
        /// </summary>
        [Required]
        public int EntityId { get; set; }

        [Required]
        [ForeignKey("Type")]
        public int TypeId { get; set; }
        public NotificationType Type { get; set; }

    }
}