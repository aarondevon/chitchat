using CoreLibrary.Models;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Data
{
    public class GetDummyUsers : IGetAllUsers
    {
        private readonly List<UserModel> _user = new List<UserModel>();
        private ISessionFactory _factory;

        public GetDummyUsers(ISessionFactory factory)
        {
            _factory = factory;
        }

        public List<UserModel> GetAllUsers()
        {
            using (var session = _factory.OpenSession())
            {
                var query = session.Query<UserModel>();
                return query.ToList();
            }
        }
    }
}
