using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MWeb.Common.Dto.Database
{
    public class DatabaseInsertValuesDto
    {
        public long? ColumnId { get; set; }
        public long? Row { get; set; }
        public string Value { get; set; }
    }
}