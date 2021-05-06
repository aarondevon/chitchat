using CoreLibrary.Models;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private ISessionFactory _factory;
        public LoginController(ISessionFactory factory)
        {
            _factory = factory;
        }
        // POST api/<LoginController>
        [HttpPost]
        public TokenModel Post([FromBody] RegisterLoginUserModel user)
        {
            IList<RegisterLoginUserModel> users;
            using (var session = _factory.OpenSession())
            {
                users = session.QueryOver<RegisterLoginUserModel>()
                .Where(u => u.Username == user.Username.Trim())
                .And(u => u.Password == user.Password.Trim())
                .List();
            }
            if (users.Count == 1)
            {
                var payload = new Dictionary<string, object>
                {
                    { "userId", users[0].Id },
                    { "username", users[0].Username }
                };

                //string secret = Environment.GetEnvironmentVariable("SECRET");
                string secret = "9z3j%mCFt3XZEi2UGJ3KBTaxgx&ZQEjQNJz4Su95x%ucaWuv#L%DFCoZAz6@";

                IJwtAlgorithm algorithm = new HMACSHA256Algorithm(); // symmetric
                IJsonSerializer serializer = new JsonNetSerializer();
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

                //var token = encoder.Encode(payload, secret);
                var token = new TokenModel();
                token.AccessToken = encoder.Encode(payload, secret);
                Console.WriteLine(token);

                return token;
            }

            return null;


        }
    }
}
