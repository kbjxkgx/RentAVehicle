using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class CommentRepository : Repository<Comment, int>, ICommentRepository
    {
        public CommentRepository(DbContext context) : base(context)
        {
        }

        public Comment GetCommentOfUser(int userId)
        {
            return context.Set<Comment>().FirstOrDefault(u => u.Id == userId);
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }

        

    }
}