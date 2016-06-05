var Component = (function () {
    function public() { }

    public.Init = function (callback) {

    };

    public.Window = {
        Minimizing: function (id, top, left, width, height) {
            var html = "<div id='" + id + "' class='shadow-window' style='top:" +
                   top + "; left: " +
                   left + "; width:" +
                   width + "px; height:" +
                   height + "px;'></div>";
            return html;
        }
    };

    public.WorkArea = {
        Icon: function (appId, ico, description) {
            var html =
           '<div data-app="' + appId + '" class="app-icon">' +
            '<div class="ico">' +
                ico +
            '</div>' +
            '<div class="description">' +
                description +
                '</div>' +
            '</div>';
            return html;
        }
    };

    public.Task = {
        Item: function (id, ico) {
            var html = '<div class="task-item" id="task' + id + '" data-task="' + id + '">'
               + '<div class="ico">' + ico + '<div class="counter">99</div></div>'
               + '<div class="apps">'
               + '</div>'
               + '</div>';
            return html;
        },
        Box: function (id, title) {
            var html = '<div class="box-wrapper">' +
                 '<div title="' + title + '" class="box" id="taskbox' + id + '">' +
                 '<div class="top-bar"><div class="title">' + title + '</div><div class="btn-close"><i class="fa fa-close"></i></div></div>' +
                 '<div class="box-container"></div>' +
                 '</div>' +
                 '</div>';
            return html;
        }
    };

    public.Table = {
        Header: function (columns) {
            var html = "<thead><tr>";

            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                html += "<th>" + col + "</th>";
            }

            html += "</tr></thead>";

            return html;
        },
        Row: function (columns) {
            var html = "<tr>";

            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                html += "<td>" + col + "</td>";
            }

            html += "</tr>";

            return html;
        },
    };

    return public;
}());

