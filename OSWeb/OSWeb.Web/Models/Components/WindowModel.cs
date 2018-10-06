using MWeb.Common.Dto.Ui;
using MWeb.Web.Models.Components.Base;

namespace MWeb.Web.Models.Components
{
    public class WindowModel : ComponentBaseModel
    {
        private WindowParameterDto parameters { get; set; }
        public WindowParameterDto Parameters
        {
            get
            {
                if (parameters == null)
                    return new WindowParameterDto();
                return parameters;
            }
            set
            {
                parameters = value;
            }
        }
    }
}