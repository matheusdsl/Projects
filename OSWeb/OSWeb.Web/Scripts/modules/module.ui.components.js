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
        },
        Trail: function (id, top, left, width, height) {
            var html = "<div id='" + id + "' class='trail-window' style='top:" +
                   top + "; left: " +
                   left + "; width:" +
                   width + "px; height:" +
                   height + "px;'></div>";
            return html;
        },
        Aba: function (id, array) {
            var html = "<div id='aba" + id + "' class='aba'>" +
                       "<div class='aba_collection'>";

            for (var i = 0; i < array.length; i++) {
                html += "<div class='aba_item item'>" +
                              array[i].title +
                        "</div>";
            }

            html += "</div>";

            //Fix Position Fixed
            html += "<div class='aba_collection fix'>";
            for (var i = 0; i < array.length; i++) {
                html += "<div class='aba_item item" + i + "'>" +
                              array[i].title +
                        "</div>";
            }
            html += "</div>";
            //End Fix

            for (var i = 0; i < array.length; i++) {
                html += "<div class='aba_container item" + i + "'>" +
                            array[i].body +
                        "</div>";
            }

            html += "</div>";

            html += "<script type='text/javascript'>";

            for (var i = 0; i < array.length; i++) {
                if (i === 0) {
                    html += '$("#aba' + id + ' .aba_container.item' + i + '").show();' +
                    '$("#aba' + id + ' .aba_item.item' + i + '").addClass("selected");';
                }
                if ((i + 1) < array.length) {
                    html += '$("#aba' + id + ' .aba_container.item' + (i + 1) + '").hide();' +
                    '$("#aba' + id + ' .aba_item.item' + (i + 1) + '").removeClass("selected");';
                }
            }

            for (var i = 0; i < array.length; i++) {
                html += '$("#aba' + id + ' .aba_item.item' + i + '").click(function () {' +

                    '$("#aba' + id + ' .aba_container.item' + i + '").show();' +
                    '$("#aba' + id + ' .aba_item.item' + i + '").addClass("selected"); ';

                for (var j = 0; j < array.length; j++) {

                    if (j !== i) {
                        html += '$("#aba' + id + ' .aba_container.item' + j + '").hide();' +
                                '$("#aba' + id + ' .aba_item.item' + j + '").removeClass("selected"); ';
                    }
                }
                html += '});';
            }

            html += "</script>";

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
        New: function (id, name, clazz, header, rows, footer, callback) {
            var _id = Util.SimpleValidation(id, Util.GetDataId("table"));
            var html = "<table id='" + _id
                + "' name='" + Util.SimpleValidation(name, Util.GetDataId())
                + "' class='" + Util.SimpleValidation(clazz, "simpleTable") + "'>";

            var _rows = Util.IsFunction(rows) ? rows() : rows;

            html += Util.SimpleValidation(header, "<thead></thead>");

            rows(function (_rows) {
                html += Util.SimpleValidation(_rows, "");
                html += Util.SimpleValidation(footer, "<tfoot></tfoot>");
                html += "</table>";

                var back = {
                    id: _id,
                    html: html,
                    config: function () {
                        //$("table#" + _id).fixedHeaderTable({ footer: true, cloneHeadToFoot: true, fixedColumn: false });
                    }
                };

                if (callback) callback(back);
                return back;
            });
        },
        Header: function (columns) {
            var html = "<thead><tr>";

            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                html += "<th>" + col.name + "</th>";
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
        }

    };

    return public;
}());

