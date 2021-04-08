using CoreLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Data
{
    public class GetDummyMessages : IGetAllMessages
    {
        private readonly List<MessageModel> _messages = new List<MessageModel>();

        public GetDummyMessages()
        {
            _messages.Add(new MessageModel { Username = "Abigail S.", Message = "It's your birthday month" });
            _messages.Add(new MessageModel { Username = "Aaron S.", Message = "I know! I am getting old!" });
            _messages.Add(new MessageModel { Username = "Abigail S.", Message = "Yeah you are!" });
            _messages.Add(new MessageModel { Username = "Aaron S.", Message = "-_-" });
            _messages.Add(new MessageModel { Username = "Abigail S.", Message = "Muahahahaha!" });
            _messages.Add(new MessageModel { Username = "John C.", Message = "Yo!" });
            _messages.Add(new MessageModel { Username = "Aaron S.", Message = "Hey!" });
        }

        public List<MessageModel> getAllMessages()
        {
            return _messages;
        }
    }
}
