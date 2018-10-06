using MWeb.Web.Models.Components;
using System.Web.Mvc;

namespace MWeb.Web.Controllers
{
    public class UiController : Controller
    {

        public PartialViewResult WorkArea()
        {
            return PartialView("WorkArea");
        }

        public PartialViewResult Taskbar()
        {
            return PartialView("Taskbar");
        }

        [ValidateInput(false)]
        [HttpPost]
        public PartialViewResult Window(WindowModel model)
        {
            return PartialView("Window", model);
        }

        [ValidateInput(false)]
        [HttpPost]
        public PartialViewResult AppTest()
        {
            return PartialView("AppTest");
        }
    }
}