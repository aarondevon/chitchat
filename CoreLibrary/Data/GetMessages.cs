using CoreLibrary.Models;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Data
{
    public class GetMessages : IGetAllMessages
    {
        private readonly List<MessageModel> _messages = new List<MessageModel>();
        private ISessionFactory _factory;
        public GetMessages(ISessionFactory factory)
        {
            _factory = factory;
        }

        public List<MessageModel> getAllMessages()
        {
            var session = _factory.OpenSession();

            var query = session.Query<MessageModel>();

            return query.ToList();
        }

        public void AddMessage(long usernameId, string message)
        {
            MessageQueryModel newMessage = new MessageQueryModel();
            newMessage.UserId = usernameId;
            newMessage.Message = message;

            using (var session = _factory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    session.Save(newMessage);

                    transaction.Commit();
                }
                
            }
        }
    }
}
