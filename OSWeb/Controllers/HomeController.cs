using System.Web.Mvc;

namespace OSWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("Start");
        }
    }
}