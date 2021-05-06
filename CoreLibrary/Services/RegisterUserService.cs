using CoreLibrary.Models;
using NHibernate;

namespace CoreLibrary.Services
{
    public class RegisterUserService : IRegisterUserService
    {
        private ISessionFactory _factory;
        public RegisterUserService(ISessionFactory factory)
        {
            _factory = factory;
        }

        UserModel IRegisterUserService.RegisterUser(string username, string password)
        {
            RegisterLoginUserModel newUser = new RegisterLoginUserModel();
            newUser.Username = username;
            newUser.Password = password;

            using (var session = _factory.OpenSession())
            {
               var user = session.QueryOver<RegisterLoginUserModel>()
                .Where(u => u.Username == newUser.Username.Trim())
                .List();

                if (user.Count == 0)
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        session.Save(newUser);
                        transaction.Commit();
                    }
                    UserModel registeredUser = new UserModel();
                    registeredUser.Username = newUser.Username;
                    return registeredUser;
                }
                else
                {
                    return null;
                }

            }
        }
    }
}
