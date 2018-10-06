
namespace MWeb.Common.Dto.Ui
{
    public class WindowParameterDto
    {
        public bool? Close { get; set; }
        public bool? Resize { get; set; }
        public bool? Minimize { get; set; }
        public string AppId { get; set; }
        public string Title { get; set; }
        public string Width { get; set; }
        public string MinWidth { get; set; }
        public string MaxWidth { get; set; }
        public string Height { get; set; }
        public string MinHeight { get; set; }
        public string MaxHeight { get; set; }
        public string XLocation { get; set; }
        public string YLocation { get; set; }        
        public string Body { get; set; }
        public string Ico { get; set; }

    }
}