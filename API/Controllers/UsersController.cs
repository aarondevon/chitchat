using CoreLibrary.Services;
using CoreLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JWT;
using JWT.Serializers;
using JWT.Algorithms;
using JWT.Exceptions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _users;
        private IRegisterUserService _registerUser;
        private readonly string _secret = Environment.GetEnvironmentVariable("SECRET");

        public UsersController(IUserService users, IRegisterUserService registerUser)
        {
            _users = users;
            _registerUser = registerUser;
        }

        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
            Request.Headers.TryGetValue("Authorization", out var token);

            try
            {
                IJsonSerializer serializer = new JsonNetSerializer();
                var provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtAlgorithm algorithm = new HMACSHA256Algorithm(); // symmetric
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder, algorithm);

                var json = decoder.Decode(token, _secret, verify: true);
                return Ok(_users.GetAllUsers());
            }
            catch (TokenExpiredException)
            {
                return StatusCode(401, "Token has expired");
            }
            catch (SignatureVerificationException)
            {
                return StatusCode(401, "Token has invalid signature");
            }
            return StatusCode(500, "Server error");
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
        public IActionResult Post([FromBody] RegisterLoginUserModel user)
        {
            UserModel result = _registerUser.RegisterUser(user.Username, user.Password);

            if (result != null)
            {
                return StatusCode(201, result);
            }
            else
            {
                return StatusCode(401, "Username already exists");
            }

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
