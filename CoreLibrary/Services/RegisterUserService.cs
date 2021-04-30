using CoreLibrary.Models;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Services
{
    public class RegisterUserService : IRegisterUserService
    {
        private ISessionFactory _factory;
        public RegisterUserService(ISessionFactory factory)
        {
            _factory = factory;
        }
        void IRegisterUserService.RegisterUser(string username, string password)
        {
            RegisterLoginUserModel newUser = new RegisterLoginUserModel();
            newUser.Username = username;
            newUser.Password = password;

            using (var session = _factory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    session.Save(newUser);
                    transaction.Commit();
                }

            }
        }
    }
}
