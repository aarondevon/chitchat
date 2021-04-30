using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Services
{
    public interface IRegisterUser
    {
        void RegisterUser(string username, string password);
    }
}
