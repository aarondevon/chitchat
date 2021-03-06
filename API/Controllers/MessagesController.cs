using API.Hubs;
using CoreLibrary.Services;
using CoreLibrary.Models;
using JWT;
using JWT.Algorithms;
using JWT.Exceptions;
using JWT.Serializers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private IMessageService _messages;
        private readonly IHubContext<MessageHub> _messageHub;
        private readonly string _secret = Environment.GetEnvironmentVariable("SECRET");

        public MessagesController(IMessageService messages, IHubContext<MessageHub> messageHub)
        {
            _messages = messages;
            _messageHub = messageHub;
        }

        // GET: api/<MessagesController>
        [HttpGet]
        [Produces("application/json")]
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
                return Ok(_messages.getAllMessages());
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

        // POST api/<MessagesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MessageModel message)
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
                await _messageHub.Clients.All.SendAsync("sendToReact", message);
                _messages.AddMessage(message.User.Id, message.Message);
                return Ok();
            }
            catch (TokenExpiredException)
            {
                Console.WriteLine("Token has expired");
            }
            catch (SignatureVerificationException)
            {
                Console.WriteLine("Token has invalid signature");
            }
            return null;
        }
    }
}
