var App = (function () {
    function public() { }

    public.Container = {
        GetEl: function (iframeSelector, selector, callback) {
            var r = $(iframeSelector).contents().find(selector);
            if (callback) callback(r);
            return r;
        },
        SetContent: function (iframeSelector, _html) {
            public.Container.GetEl(iframeSelector, "html", function (el) {
                var html = '<script src="/Scripts/jquery-1.10.2.min.js"></script>' +
                    '<script src="/Scripts/modules/module.util.js"></script>' +
                    '<script src="/Scripts/modules/module.ui.components.js"></script>';
                html += _html;
                el.html(html);
            });
        }
    };

    public.Open = function (appId) {
        var test =
JSON.stringify(
          '  {                                                                                                                                 ' +
          '      AppId: null,                                                                                                                  ' +
          '      Name: "TaskManager",                                                                                                          ' +
          '      Title: "Task Manager",                                                                                                        ' +
          '      Ico: "<i class=\'fa fa-file-text-o\' style=\'color: #999;\'></i>",                                                            ' +
          '      Body: "",                                                                                                                     ' +
          '      Render: function (id) {                                                                                                       ' +
          '          if (id) {                                                                                                                 ' +
          '              var tasks;                                                                                                            ' +
          '              var threads;                                                                                                          ' +
          '              function refresh() {                                                                                                  ' +
          '                  tasks = Ui.GetWindows();                                                                                          ' +
          '                  threads = Core.Threads.Get();                                                                                     ' +
          '                  var el = $("#aba" + id);                                                                                          ' +
          '                  var el_tasks = el.find("#tasks" + id);                                                                            ' +
          '                  var el_threads = el.find("#threads" + id);                                                                        ' +
          '                                                                                                                                    ' +
          '                  var temp = "";                                                                                                    ' +
          '                  temp += Component.Table.Header(["Id", "Title", "Exhibition", "Status", "App Id"]);                                ' +
          '                  for (var i = 0; i < tasks.length; i++) {                                                                          ' +
          '                      var w = tasks[i];                                                                                             ' +
          '                      temp += Component.Table.Row([w.Id, w._window.Parameters.Title, w.Exhibition, w.Status, w.AppId]);             ' +
          '                  }                                                                                                                 ' +
          '                  el_tasks.html(temp);                                                                                              ' +
          '                                                                                                                                    ' +
          '                  temp = "";                                                                                                        ' +
          '                  temp += Component.Table.Header(["Id", "Instance", "Name", "Interval", "Qtd.Refresh"]);                            ' +
          '                  for (var i = 0; i < threads.length; i++) {                                                                        ' +
          '                      var t = threads[i];                                                                                           ' +
          '                      temp += Component.Table.Row([t.id, t.instance.number, t.name, t.time + " ms", t.instance.qtdHistory()]);      ' +
          '                  }                                                                                                                 ' +
          '                  el_threads.html(temp);                                                                                            ' +
          '                                                                                                                                    ' +
          '              }                                                                                                                     ' +
          '              Core.Threads.Add(refresh, 3000, id);                                                                                  ' +
          '              refresh();                                                                                                            ' +
          '          }                                                                                                                         ' +
          '      },                                                                                                                            ' +
          '      Resize: true,                                                                                                                 ' +
          '      Minimize: true,                                                                                                               ' +
          '      Resizable: true,                                                                                                              ' +
          '      Draggable: true,                                                                                                              ' +
          '      Height: "400px",                                                                                                              ' +
          '      Width: "600px",                                                                                                               ' +
          '      XLocation: null,                                                                                                              ' +
          '      YLocation: null,                                                                                                              ' +
          '      Background: "#eee",                                                                                                           ' +
          '      IsNative: true                                                                                                                ' +
          '  }                                                                                                                                 ');

        debugger;
        //Ui.CreateWindow(app, null);

    };
    //<iframe class="app-content" id="@Html.Raw("appContent"+Model.Id)"></iframe>
    return public;
}());