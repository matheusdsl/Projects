using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OSWeb.Web.Startup))]
namespace OSWeb.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
