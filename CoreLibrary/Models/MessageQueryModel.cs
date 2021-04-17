using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Models
{
    public class MessageQueryModel
    {
        public virtual long Id { get; set; }
        public virtual string Message { get; set; }
        public virtual string Username { get; set; }
    }
}
