using CoreLibrary.Models;
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

        public GetDummyUsers()
        {
            _user.Add(new UserModel { Id = 1, Username = "Aaron S." });
            _user.Add(new UserModel { Id = 2, Username = "Abigail S." });
            _user.Add(new UserModel { Id = 3, Username = "John C." });
        }

        public List<UserModel> GetAllUsers()
        {
            return _user;
        }
    }
}
