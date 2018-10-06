using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MWeb.Web.Startup))]
namespace MWeb.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
