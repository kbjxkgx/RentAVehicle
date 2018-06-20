using RentApp.Models.Entities;
using RentApp.Persistance.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace RentApp.Controllers
{
    public class PricelistController : ApiController
    {
        private IUnitOfWork db;

        public PricelistController(IUnitOfWork context)
        {
            db = context;
        }

        // GET: api/Services
        [Authorize(Roles ="Manager")]
        public IEnumerable<Pricelist> GetPricelists()
        {
            return db.Pricelists.GetAll();
        }

        // GET: api/Services/5
        [ResponseType(typeof(Pricelist))]
        [Authorize(Roles = "Manager")]
        public IHttpActionResult GetPricelist(int id)
        {
            Pricelist item = db.Pricelists.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        [Authorize(Roles = "Manager")]
        public IHttpActionResult PutPricelist(int id, Pricelist item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.Id)
            {
                return BadRequest();
            }
            db.Pricelists.Update(item);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PricelistExists(id))
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
        [ResponseType(typeof(Pricelist))]
        [Authorize(Roles = "Manager")]
        public IHttpActionResult PostPricelist(Pricelist pricelist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            List<Item> items = pricelist.Items;
            pricelist.Items = null;
            db.Pricelists.Add(pricelist);
            db.Complete();

            foreach (Item item in items)
            {
                item.ItemPriceListId = pricelist.Id;
                db.Items.Add(item);
            }
            db.Complete();
            return CreatedAtRoute("DefaultApi", new { id = pricelist.Id }, pricelist);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(Pricelist))]
        [Authorize(Roles = "Manager")]
        public IHttpActionResult DeletePricelist(int id)
        {
            Pricelist item = db.Pricelists.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            db.Pricelists.Remove(item);
            db.Complete();

            return Ok(item);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PricelistExists(int id)
        {
            Pricelist item = db.Pricelists.Get(id);
            if (item == null)
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
