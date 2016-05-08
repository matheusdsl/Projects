var NativeApps = (function () {
    function public() { }

    var nativeApps = [
        {
            AppId: null,
            Name: "PopupError",
            Title: "Error",
            Ico: "<i class='fa fa-warning' style='color: #e55454;'></i>",
            Body: "",
            Resize: false,
            Minimize: false,
            Height: "100px",
            Width: "300px"
        },
        {
            AppId: null,
            Name: "PopupConfirm",
            Title: "Confirm",
            Ico: "<i class='fa fa-question-circle' style='color: #58a1c2;'></i>",
            Body: "",
            Render: function (txt, selectorOk, selectorCancel) {
                var body = txt;
                body += "<div class='popup-btn-area'>";
                body += "<button id='" + selectorOk + "'>Ok</button>";
                body += "<button id='" + selectorCancel + "'>Cancel</button>";
                body += "</div>";
                return body;
            },
            Resize: false,
            Minimize: false,
            Resizable: false,
            Draggable: true,
            Height: "200px",
            Width: "300px",
            XLocation: null,
            YLocation: null
        },
        {
            AppId: null,
            Name: "PopupAlert",
            Title: "Alert",
            Ico: "<i class='fa fa-warning' style='color: #ffda2b;'></i>",
            Body: "",
            Render: function (txt, selectorOk, selectorCancel) {
                var body = txt;
                body += "<div class='popup-btn-area'>";
                body += "<button id='" + selectorOk + "'>Ok</button>";
                body += "</div>";
                return body;
            },
            Resize: false,
            Minimize: false,
            Resizable: false,
            Draggable: true,
            Height: "200px",
            Width: "300px",
            XLocation: null,
            YLocation: null
        },
        {
            AppId: null,
            Name: "TextEditor",
            Title: "Text Editor",
            Ico: "<i class='fa fa-file-text-o' style='color: #999;'></i>",
            Body: "",
            Render: function (body) {
                return body;
            },
            Resize: true,
            Minimize: true,
            Resizable: true,
            Draggable: true,
            Height: "600px",
            Width: "1100px",
            XLocation: null,
            YLocation: null
        }
    ];

    public.Init = function (callback) {
        preload(function () {
            //document.oncontextmenu = function (e) {
            //    public.ContextMenu(e, new Array());
            //    return false;
            //};
            public.Clock($(".clock-area"));
            public.Calendar($(".calendar-area"));
            public.BrowserMonitor($(".notification-area"));
            if (callback) callback();
        });
    };

    public.Clock = function (parent) {
        var divId = Util.GetDataId("clock");
        var clockThread;
        parent.append("<div id='" + divId + "' class='clock'></div>");

        function clock() {
            $("#" + divId).html(Util.Now.TimeWithoutSec());
        }
        clock();
        clockThread = Core.Threads.Add(clock, 950, "Clock");

        return clockThread;
    };

    public.Calendar = function (parent) {
        var id = Util.GetDataId();
        var divId = "calendar" + id;
        var clockThread;
        var timeEffect = 400;
        parent.addClass("not-visible");
        $(".taskbar .util-area .clock-area").click(function () {
            if (parent.hasClass("is-visible")) {
                parent.slideToggle(timeEffect, function () {
                    parent.addClass("not-visible");
                    parent.removeClass("is-visible");
                    Core.Threads.Remove(clockThread);
                });
            }
            else {
                parent.html("<div id='clock" + id + "' class='calendar-clock'></div><div id='" + divId + "' class='calendar'></div>");
                $("#" + divId).datepicker({
                    showOtherMonths: true,
                    changeMonth: true,
                    changeYear: true
                });
                function calendar() {
                    $("#clock" + id).html(Util.Now.Time() + "<div class='calendar-date'>" + Util.Now.Date() + "</div>");
                }
                calendar();
                clockThread = Core.Threads.Add(calendar, 950, "Calendar");
                parent.addClass("is-visible");
                parent.removeClass("not-visible");
                parent.slideToggle(timeEffect);

                var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
                $("#" + divId).bind(mousewheelevt, function (e) {

                    var evt = window.event || e;
                    evt = evt.originalEvent ? evt.originalEvent : evt;
                    var delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta;

                    if (delta > 0) {
                        $(".ui-datepicker-prev").trigger("click");
                    }
                    else {
                        $(".ui-datepicker-next").trigger("click");
                    }
                });
            }
        });
    }

    public.BrowserMonitor = function (parent) {
        var progress;
        var timer;
        function libs() {
            progress = "undefined" == typeof progress ? function () { var e = {}, t = 0, n = [], o = function (e) { for (var t = 0, n = 0, o = +bottomline, r = 0; r < e.length; r++) { var a = +e[r]; a < bottomline ? t += o : a > topline && (t += a), n += a } var l = n / 100, c = t ? t / l : 0; return { p: c > 100 ? 100 : c, r: t } }; return e.build = function (e) { var t = "string" == typeof e ? document.getElementById(e) : e; t.className = "browserMonitor"; var o = t.appendChild(document.createElement("span")); o.className = "leader"; var r = t.appendChild(document.createElement("div")); r.className = "hiding"; var a = document.createDocumentFragment(), l = document.createElement("span"); l.style; l.className = "ACM_graphUnit"; for (var c = 0; 18 > c; c++) n.unshift(a.appendChild(l.cloneNode(!0))); t.appendChild(a) }, e.do_next = function (e) { var t = n.pop(), o = t.parentNode; n.unshift(t), o.removeChild(t), t.style.height = (e >= 100 ? 100 : ++e) + "%", o.appendChild(t) }, e.do_test = function () { var e = n.length; setTimeout(function t() { var n = ~~(100 * Math.random()); this.do_next(n), --e && setTimeout(t, 800) }, 800) }, e.push = function (e, n) { var r = o(e), a = r.r + t; if (a > n) { for (var l = ~~(a / n), c = 0; l > c; c++) this.do_next(100), a -= n; t = a } else this.do_next(r.p), t = 0 }, e.collect = function () { timer.collect(), collector.start(e) }, e.stop = function () { timer.stop(), collector.stop() }, e }() : progress, collector = "undefined" == typeof collector ? function () { var e, t = 800, n = {}; return n.start = function (n) { if (e) return void debug("Collector already started"); var o = t; e = setInterval(function () { var e = window.stack; e.length && (window.stack = [], n.push(e, o)) }, t) }, n.stop = function () { e && (clearInterval(e), e = null) }, n }() : collector;
            window.topline = null; window.bottomline = null; window.stack = [];
            timer = "undefined" == typeof timer ? function () { var t = {}, n = null, e = !1; return t.busy = function () { return e }, t.stop = function () { n && (clearTimeout(n), n = !1), e = !1 }, t.callibrate = function (n) { t.collect(1, function () { for (var t = stack, e = {}, a = 0; a < t.length; a++) { var r = t[a]; e[r] ? e[r]++ : e[r] = 1 } var l, o, i = t.length / 100, c = [], u = []; for (var a in e) { var r = e[a], s = r / i; u.push([s, a]) } u.sort(function (t, n) { var e = t[0], a = n[0]; return e > a ? -1 : a > e ? 1 : 0 }); var f = u[0], v = u[1]; c = u.length ? [f[1], 1 == u.length ? f[1] : v[1]] : [], c.sort(), o = c[0], l = c[1], null != l && null != o ? (topline = l, bottomline = o, n && n()) : alert("scream") }) }, t.collect = function (a, r) { if (!e) { e = !0; var l = 0; if (a) { var o = 800 * a, i = ~~(o / (topline ? topline : 1)); stack = new Array(i); var c = 0; !function () { var e = arguments.callee, a = +new Date; n = setTimeout(function () { var n = +new Date, i = n - a; if (l += i, stack[c++] = i, o > l) e(); else { for (t.stop() ; stack.length && null == stack[stack.length - 1];) stack.pop(); r && r() } }, 0) }() } else stack = [], function u() { var t = +new Date; e && (n = setTimeout(function (n) { var e = +new Date, a = e - t; stack.push(a), u() }, 0)) }(); return stack } }, t }() : timer;
        }
        libs();

        function connect(node, event, fnc) {
            node[event] = fnc;
        }

        function disconnect(node, event) {
            node[event] = null;
        }

        var divId = Util.GetDataId("monitor");

        var root = document.createElement("div");
        root.title = "Browser Monitor (amonjs on GitHub)";
        root.className = "monitor";
        root.id = divId;

        var progressNode = root.appendChild(document.createElement("div"));
        if (parent) {
            parent.append($(root));
        }
        else {
            document.body.appendChild(root);
        }
        progress.build(progressNode);

        var running = false;
        var calibrated = false;

        function clicker() {
            if (calibrated) {
                if (running) {
                    progress.stop();
                } else {
                    progress.collect();
                }
                running = !running;
            } else {
                timer.callibrate(function () {
                    calibrated = true;
                    clicker();
                });
            }
        }
        clicker();
    };

    public.PopupAlert = function (message, selectorOk, callback) {
        var app;
        var body = "<div class='popup-container'>" + message + "</div>";

        Util.Find(nativeApps, "obj.Name == 'PopupAlert'", function (popup) {
            app = Util.Clone(popup);
            if (app.AppId == null)
                app.AppId = Util.GetDataId("nativeApp");
            app.Body = app.Render(body, selectorOk);
            Ui.CreateWindow(app, callback);
            return app;
        });
    };

    public.PopupError = function (message, callback) {
        var app;
        var body = "<div class='popup-container'>" + message + "</div>";

        Util.Find(nativeApps, "obj.Name == 'PopupError'", function (popup) {
            app = Util.Clone(popup);
            if (app.AppId == null)
                app.AppId = Util.GetDataId("nativeApp");
            app.Body = body;
            Ui.CreateWindow(app, callback);
            return app;
        });
    };

    public.PopupConfirm = function (message, selectorOk, selectorCancel, callback) {
        var app;
        var body = "<div class='popup-container'>" + message + "</div>";

        Util.Find(nativeApps, "obj.Name == 'PopupConfirm'", function (popup) {
            app = Util.Clone(popup);
            if (app.AppId == null)
                app.AppId = Util.GetDataId("nativeApp");
            app.Body = app.Render(body, selectorOk, selectorCancel);
            Ui.CreateWindow(app, callback);
            return app;
        });
    };

    public.PopupOffline = function (title, message, callback) {
        var id = Util.GetDataId();
        var body = "<div class='popup-container'>" + message + "</div>";
        var html = "<div class='window draggable' id='popupOffline" + id + "' data-window='" + id + "' " +
            "style='width: 300px; min-width: 150px; max-width: 100%; height: 200px; min-height: 90px; max-height: unset; top: 15%; left: 40%; display: block; z-index: 999;'>" +
            "<div class='top-bar'><div class='left drag'><span class='icon'></span>" + title + "</div><div class='right'>" +
            "<div class='btn btn-close' id='btnClose" + id + "'><i class='fa fa-close'></i></div></div></div>" +
            "<div class='body'>" + body + "</div></div>"
        var obj = {
            id: id,
            html: html
        };
        if (callback) callback(obj);
        return obj;
    };

    public.ContextMenu = function (e, itens) {
        $(".context-menu").remove();
        var target = $(e.target);
        // var ctxId = Util.GetDataId("contextMenu");
        //var html = "<div id='" + ctxId + "' class='context-menu'>";
        var html = "<div class='context-menu'>";
        for (var i = 0; i < itens.length; i++) {
            html += "<div class='item' id='item" + i + "'>" + itens[i].name + "</div>";
        }
        html += "</div>";
        $("body").append(html);
        var el = $(".context-menu");
        //$("#" + ctxId).css({
        el.css({
            "top": e.pageY + "px",
            "left": e.pageX + "px"
        });
        var winSize = {
            width: $(window).width(),
            height: $(window).height()
        };

        $(window).click(function (e) {
            //$("#" + ctxId).remove();
            el.remove();
        });

        $(window).resize(function () {
            //var el = $("#" + ctxId);           
            var x = winSize.width - $(window).width();
            var y = winSize.height - $(window).height();
            winSize = {
                width: $(window).width(),
                height: $(window).height()
            };
            var newX = parseInt(el.css("left").replace('px', '')) - x;
            var newY = parseInt(el.css("top").replace('px', '')) - y;
            el.css({
                "top": newY + "px",
                "left": newX + "px"
            });
        });
    }

    public.TextEditor = function () {
        var instance;
        var divId = Util.GetDataId("textEditor");

        $("body").append("<div id='scriptAppend" + divId + "'><script src=\"/Scripts/modules/module.apps.native/ckeditor/ckeditor.js\"></script></div>");

        var body = "<div id='" + divId + "'><textarea id='textarea" + divId + "' class='texteditor'></textarea></div>";

        Util.Find(nativeApps, "obj.Name == 'TextEditor'", function (config) {
            app = Util.Clone(config);
            if (app.AppId == null)
                app.AppId = Util.GetDataId("nativeApp");
            app.Body = app.Render(body);
            Ui.CreateWindow(app, function (w) {
                instance = CKEDITOR.replace("textarea" + divId, {
                    on: {

                        'instanceReady': function (evt) {

                            instance.config.allowedContent = true;
                            instance.resize("100%", w._element.find(".body").height());

                            var config = {
                                stopCallback: function (event, ui) {
                                    instance.resize("100%", w._element.find(".body").height());
                                }
                            };
                            Ui.MakeResizable(w._element, config);                           
                        }
                    }
                });

            });
            return app;
        });
    };

    function preload(callback) {
        for (var i = 0; i < nativeApps.length; i++) {
            nativeApps[i].AppId = Util.GetDataId();
        }
        if (callback)
            callback();
    }

    return public;
}());