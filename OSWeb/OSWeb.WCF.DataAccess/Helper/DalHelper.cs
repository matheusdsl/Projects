using MWeb.Common.Dto.Database;
using MWeb.WCF.DataAccess.Interface;
using MWeb.WCF.Entity.Core;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MWeb.WCF.DataAccess.Helper
{
    public class DalHelper : IDalHelper
    {
        DatabaseDataContext dc = new DatabaseDataContext();

        public long? GetNextRow(long? tableId)
        {
            string last = "";
            long? value = null;

            try
            {
                if (tableId.HasValue)
                {
                    last = dc.Tables
                        .Where(xs => xs.Id_Table == tableId.Value).FirstOrDefault()
                        .Columns.FirstOrDefault()
                        .Datas.OrderByDescending(xs => xs.Row)
                        .Select(xs => xs.Row)
                        .Distinct()
                        .FirstOrDefault()
                        .ToString();

                    value = Convert.ToInt64(last);
                    value++;
                }
            }
            catch
            {
                value = 1;
            }

            return value;
        }

        public ResultStatusDto InsertRow(DatabaseInsertDto dto)
        {
            long? row = this.GetNextRow(dto.TableId);

            if (!row.HasValue)
                return new ResultStatusDto {
                    Ok = false,
                    Message = "Table not found"
                };

            List<Data> datas = new List<Data>();
            List<DataHistory> history = new List<DataHistory>();

            foreach (var v in dto.Values)
            {
                datas.Add(new Data
                {
                    Id_Column = v.ColumnId.Value,
                    Row = row.Value,
                    Value = v.Value
                });

                history.Add(new DataHistory
                {
                    Action = "Insert",
                    Date = DateTime.Now,
                    Id_Column = v.ColumnId.Value,
                    Row = row,
                    Value = v.Value
                });
            }

            try
            {
                dc.Datas.InsertAllOnSubmit(datas);
                dc.DataHistories.InsertAllOnSubmit(history);

                return new ResultStatusDto
                {
                    Ok = true,
                    Message = ""
                };
            }            
            catch
            {
                return new ResultStatusDto
                {
                    Ok = false,
                    Message = "Error on insert row"
                };
            }
        }


    }
}
