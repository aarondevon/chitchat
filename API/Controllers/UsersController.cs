using CoreLibrary.Data;
using CoreLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IGetAllUsers _users;

        public UsersController(IGetAllUsers users)
        {
            _users = users;
        }

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<UserModel> Get()
        {
            return _users.GetAllUsers();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            List<UserModel> users = _users.GetAllUsers();
            string username = "";
            foreach (UserModel user in users)
            {
                if (user.Id == id)
                {
                    username = user.Username;
                    break;
                }
                else
                {
                    username= "No user found";
                }
            }
            return username;
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
