using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWeb.Common.Dto.Database
{
    public class DatabaseInsertDto
    {
        public long? DatabaseId { get; set; }
        public long? TableId { get; set; }
        public string DatabaseName { get; set; }
        public string TableName { get; set; }
        
        public IList<DatabaseInsertValuesDto> Values { get; set; }       
    }
}