using CoreLibrary.Models;
using NHibernate;
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
        private ISessionFactory _factory;
        public GetDummyMessages(ISessionFactory factory)
        {
            _factory = factory;
        }

        public List<MessageQueryModel> getAllMessages()
        {
            using (var session = _factory.OpenSession())
            {
                var query = session.CreateQuery(
                    "select messages.id, messages.message, username.username " +
                    "from messages " +
                    "inner join username on messages.username_id = username.id " +
                    "order by messages.id; "
                    ).List();

                return query.;
            }
        }

        public void AddMessage(long usernameId, string message)
        {
            MessageModel newMessage = new MessageModel();
            newMessage.UsernameId = usernameId;
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
