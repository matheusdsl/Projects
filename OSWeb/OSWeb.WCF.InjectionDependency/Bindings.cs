using Ninject.Modules;
using MWeb.WCF.Business.BLL.Database;
using MWeb.WCF.DataAccess;
using MWeb.WCF.DataAccess.Helper;
using MWeb.WCF.DataAccess.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MWeb.WCF.InjectionDependency
{
    public class Bindings : NinjectModule
    {
        public override void Load()
        {
            //BLL
            Bind<IDatabaseBll>().To<DatabaseBll>();


            //DAL
            Bind<IDalHelper>().To<DalHelper>();
        }
    }
}
