using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWeb.Common.Dto.Database
{
    public class DatabaseSelectDto
    {
        
        public string Database { get; set; }
        public string Table { get; set; }
        public string Column { get; set; }
        public string Value { get; set; }


    }
}