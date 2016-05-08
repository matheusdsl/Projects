using OSWeb.Common.Dto.Ui;
using OSWeb.Web.Models.Components.Base;

namespace OSWeb.Web.Models.Components
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