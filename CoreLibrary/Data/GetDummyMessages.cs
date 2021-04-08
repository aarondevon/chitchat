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
        public List<MessageModel> messages;

        public GetDummyMessages(List<MessageModel> messages)
        {
            messages.Add(new MessageModel { Username = "Abigail S.", Message = "It's your birthday month" });
            messages.Add(new MessageModel { Username = "Aaron S.", Message = "I know! I am getting old!" });
            messages.Add(new MessageModel { Username = "Abigail S.", Message = "Yeah you are!" });
            messages.Add(new MessageModel { Username = "Aaron S.", Message = "-_-" });
            messages.Add(new MessageModel { Username = "Abigail S.", Message = "Muahahahaha!" });
            messages.Add(new MessageModel { Username = "John C.", Message = "Yo!" });
            messages.Add(new MessageModel { Username = "Aaron S.", Message = "Hey!" });

            this.messages = messages;
        }

        public List<MessageModel> getAllMessages()
        {
            return messages;
        }
    }
}
