﻿using CoreLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLibrary.Data
{
    public interface IGetAllMessages
    {
        List<MessageModel> getAllMessages();
        void AddMessage(string username, string message);
    }
}
