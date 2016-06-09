﻿var Ui = (function () {
    function public() { }

    public.Init = function (callback) {

        startWorkArea(function () {
            Taskbar.Init();

            if (callback)
                callback();
        });

    };

    public.CreateWindow = function (config, callback) {
        Window.CreateWindow(config, callback);
    };

    public.ShowLoading = function (msg, parent, callback) {
        if (!msg) msg = "Loading...";
        if (!parent) parent = $("body");
        var html = "<div id='loading' class='overlay' style='display:none;'><div class='loading'>" + msg + "</div></div>";
        $(parent).append(html);
        $("#loading").fadeIn(0);
        if (callback) callback();
    };

    public.RemoveLoading = function () {
        $("#loading").fadeOut(300, function () { $("#loading").remove(); });
    }

    public.MakeDraggable = function (el, config) {
        Window.MakeDraggable(el, config);
    };

    public.MakeResizable = function (el, config, onResizeStop) {
        Window.MakeResizable(el, config, onResizeStop);
    };

    public.SetEventsWindow = function (w) {
        Window.SetEventsWindow(w);
    }

    public.GetWindows = function () {
        return Window.GetWindows();
    };

    public.GetNextLocationWindow = function () {
        Window.GetNextLocationWindow();
    };

    public.PrintArea = function (elSource, onrendered) {
        html2canvas(elSource, {
            onrendered: function (canvas) {
                if (onrendered)
                    onrendered(canvas);
            }
        });
    };

    //private
    var window_status = { RUNNING: "RUNNING", NO_REPLY: "NO REPLY" };
    var window_status_exhibition = { CUSTOM: "CUSTOM", MINIMIZED: "MINIMIZED", MAXIMIZED: "MAXIMIZED" };

    function startWorkArea(callback) {
        Util.Ajax("/Ui/WorkArea", {},
           function (data) {
               $("body").append(data);
               Util.Ajax("/Ui/Taskbar", {},
                   function (data) {
                       $("body").append(data);
                       if (callback)
                           callback();
                   },
                   function () {
                       //erro
                   },
                   function () {

                   });
           });
    }

    //sub
    var Window = (function () {
        function protected() { }

        var Windows;

        var window_last_zindex = 100;

        protected.CreateWindow = function (config, callback) {
            var id = Util.GetDataId();
            var obj = setDefaultConfigWindow(id, config);
            var online = true;
            Util.Ajax("/Ui/Window", obj,
                function (data) {
                    $(".work-area").append(data);

                    var element = $("#window" + id)

                    var $Window = {
                        Id: id,
                        Status: window_status.RUNNING,
                        PreviousExhibition: null,
                        Exhibition: window_status_exhibition.CUSTOM,
                        Draggable: Util.SimpleValidation(config.Draggable, true),
                        Resizable: Util.SimpleValidation(config.Resizable, true),
                        AppId: obj.Parameters.AppId,
                        Task: {},
                        _window: obj,
                        _element: element
                    };

                    if (!config.Calls)
                        config.Calls = {};

                    setEventsWindow($Window, config.Calls);

                    Taskbar.AddTask($Window, getWindows(), function () {
                        getWindows($Window);
                        element.fadeIn(200);
                        toEvidence(element, 500);

                        Util.Sleep(function () {
                            public.PrintArea($("#window" + $Window.Id + " .body"), function (canvas) {
                                if ($Window.Exhibition !== window_status_exhibition.MINIMIZED) {
                                    var myImage = canvas.toDataURL("image/gif");
                                    $("#taskbox" + $Window.Id + " .box-container").html("<img src='" + myImage + "'/>");
                                }
                            });
                        }, 500);

                        if (callback)
                            callback($Window);
                    });
                },
                function (x1, x2, x3) {
                    Exception(null, function () {
                        if (x1.readyState === 0) {
                            if (online) {
                                online = false;
                                Core.Popup.Offline("<b>Connection Refused!</b>");
                            }
                        }
                        else {
                            Core.Popup.Error(x1.responseText);
                        }
                    });
                });
        };

        protected.GetWindows = function () {
            return getWindows();
        };

        protected.RemoveWindow = function (id, callback) {
            removeWindow(id, callback);
        };

        protected.ToFront = function (el, callback) {
            toFront(el, callback);
        };

        protected.MinimizeWindow = function (el, obj, visible) {
            minimizeWindow(el, obj, visible);
        };

        protected.MakeDraggable = function (el, config) {
            el.draggable({
                preventCollision: Util.SimpleValidation(config.preventCollision, false),
                containment: Util.SimpleValidation(config.containment, ".work-area"),
                handle: Util.SimpleValidation(config.handle, ".drag"),
                stack: Util.SimpleValidation(config.stack, ".window")
            });
        };

        protected.MakeResizable = function (el, config, onResizeStop) {
            el.resizable({
                containment: Util.SimpleValidation(config.containment, ".work-area"),
                helper: Util.SimpleValidation(config.handle, "ui-resizable-helper"),
                stop: function (event, ui) {
                    if (onResizeStop)
                        onResizeStop(event, ui);
                }
            });
        };

        protected.SetEventsWindow = function (w) {
            setEventsWindow(w);
        };

        protected.GetNextLocationWindow = function () {
            getNextLocationWindow();
        };

        protected.CloseWindow = function (el, onClose) {
            closeWindow(el, onClose);
        };

        protected.TriggerClose = function (el) {
            $(el).find(".btn-close").trigger("click");
        };

        protected.TriggerMinimize = function (el) {
            $(el).find(".btn-minimize").trigger("click");
        };

        protected.TriggerResize = function (el) {
            $(el).find(".btn-resize").trigger("click");
        };

        function setEventsWindow(w, calls) {
            var el = w._element;

            if (w.Draggable)
                protected.MakeDraggable(el, {});

            if (w.Resizable) {
                if (!calls.onResizeStop) calls.onResizeStop = null;
                protected.MakeResizable(el, {}, calls.onResizeStop);
            }

            el.click(function () {
                toFront(el, null, true);
            });

            el.find(".top-bar").mousedown(function () {
                el.addClass('evidence');
            });

            el.find(".top-bar").mouseup(function () {
                el.removeClass('evidence');
            });

            el.find(".btn-close").click(function () {
                if (!calls.onClose) calls.onClose = null;
                closeWindow(el, calls.onClose);
            });

            el.find(".btn-resize").click(function () {
                Util.Find(getWindows(), "obj.Id == '" + el.data('window') + "'", function (obj, i) {
                    resizeWindow(el, obj, obj.Exhibition == window_status_exhibition.MAXIMIZED);
                    if (calls.onResize) calls.onResize();
                });
            });

            el.find(".btn-minimize").click(function () {
                Util.Find(getWindows(), "obj.Id == '" + el.data('window') + "'", function (obj, i) {
                    minimizeWindow(el, obj, obj.Exhibition != window_status_exhibition.MINIMIZED);
                    if (calls.onMinimizeWindow) calls.onMinimizeWindow();
                });
            });

            el.find(".body").css({ "background": w._window.Parameters.Background });
        }

        function getWindows(_new) {
            if (!Windows) Windows = new Array();
            if (_new) Windows.push(_new);
            return Windows;
        }

        function getWindow(id, callback) {
            Util.Find(getWindows(), "obj.Id == " + id, function (obj, i) {
                if (callback)
                    callback(obj);
            }, function () {
                if (callback)
                    callback(null);
            });
        }

        function countWindows() {
            if (!Windows) return 0;
            return Windows.length;
        }

        function getNextLocationWindow() {
            var c = countWindows();
            var i = (c > 0 ? c : 0.3) * 5;
            return i + "px";
        };

        function removeWindow(id, callback, index) {
            if (index !== 'undefined' && index !== null) {
                Windows.splice(index, 1);
                callback();
            }
            else {
                Util.Find(getWindows(), "obj.Id == '" + id + "'", function (obj, i) {
                    Windows.splice(i, 1);
                    if (callback)
                        callback(i);
                });
            }
        }

        function closeWindow(el, onClose) {
            Util.Find(getWindows(), "obj.Id == '" + el.data('window') + "'",
                function (obj, i) {
                    obj.Status = window_status.NO_REPLY;
                    el.css({
                        'border': '1px solid red',
                    });
                    el.fadeOut(100,
                        function () {
                            removeWindow(null, function () {
                                el.remove();
                                Taskbar.RemoveTask(obj);
                                if (onClose)
                                    onClose(obj);
                            }
                            , i);
                        }
                    );
                },
                function () {
                    el.fadeOut(500,
                       function () {
                           el.remove();
                       }
                   );
                });
        }

        function resizeWindow(el, obj, maximized) {

            if (!maximized) {
                obj.Exhibition = window_status_exhibition.MAXIMIZED;
                obj.Draggable = false;
                obj.Resizable = false;
                el.addClass("maximized");
                el.draggable({ disabled: true });
                el.resizable({ disabled: true });
                el.find(".btn-resize").html("<i class='fa fa-clone'></i>");
                toFront(el);
            }
            else {
                toEvidence(el, 500);
                obj.Exhibition = window_status_exhibition.CUSTOM;
                obj.Draggable = true;
                obj.Resizable = true;
                el.removeClass("maximized");
                el.draggable({ disabled: false });
                el.resizable({ disabled: false });
                el.find(".btn-resize").html("<i class='fa fa-square-o'></i>");
            }
        }

        function minimizeWindow(el, obj, visible) {
            if (visible) {
                obj.PreviousExhibition = obj.Exhibition;
                obj.Exhibition = window_status_exhibition.MINIMIZED;
                $("#taskbox" + obj.Id).css({
                    "zoom": "0.8"
                });
                el.addClass("minimized");
                el.fadeOut(0);
                animateMinimizeWindow(el, visible);
            }
            else {
                if (obj.PreviousExhibition !== null)
                    obj.Exhibition = obj.PreviousExhibition;
                else
                    obj.Exhibition = window_status_exhibition.CUSTOM;
                $("#taskbox" + obj.Id).css({
                    "zoom": "1"
                });
                el.removeClass("minimized");
                el.fadeIn(100);
                toFront(el);
            }

        }

        function animateMinimizeWindow(el, visible) {
            var id = Util.GetDataId("shadowWindow");
            if (visible) {
                var html = Component.Window.Minimizing(id, el.css("top"), el.css("left"), el.width(), el.height());
                $("body").append(html);
                var shadow = $("#" + id);
                shadow.animate({
                    "top": "100%",
                    "left": "45%",
                    "width": "1px",
                    "height": "1px"
                }, 500, function () {
                    shadow.remove();
                });

            }
            else {

            }
        }

        function setDefaultConfigWindow(id, c) {
            if (!c) c = {};
            if (!id) id = "undefinedId_PleaseCheckGeneration";

            var base = Util.Clone(Core.BaseConfigApp);

            base.AppId = Util.SimpleValidation(c.AppId, "undefinedAppId")
            base.Title = Util.SimpleValidation(c.Title, "Unnamed " + Util.GetDataIdAux());
            base.Ico = Util.SimpleValidation(c.Ico, "<i class='fa fa-cube'></i>");
            base.Close = Util.SimpleValidation(c.Close, true);
            base.Resize = Util.SimpleValidation(c.Resize, true);
            base.Minimize = Util.SimpleValidation(c.Minimize, true);
            base.Width = Util.SimpleValidation(c.Width, "400px");
            base.MinWidth = Util.SimpleValidation(c.MinWidth, "150px");
            base.MaxWidth = Util.SimpleValidation(c.MaxWidth, "100%");
            base.Height = Util.SimpleValidation(c.Height, "100px");
            base.MinHeight = Util.SimpleValidation(c.MinHeight, "90px");
            base.MaxHeight = Util.SimpleValidation(c.MaxHeight, "unset");
            base.XLocation = Util.SimpleValidation(c.XLocation, getNextLocationWindow());
            base.YLocation = Util.SimpleValidation(c.YLocation, getNextLocationWindow());
            base.Body = Util.SimpleValidation(c.Body, "<h2>Empty App</h2>");
            base.Calls = Util.SimpleValidation(c.Calls, null);
            base.Render = Util.SimpleValidation(c.Render, null);
            base.Background = Util.SimpleValidation(c.Background, "#fff");

            var obj = {
                Id: id,
                Parameters: base
            };

            return obj;
        }

        function toFront(el, callback, EvidenceManual) {

            var last_z = 0;
            $(".window").map(function (i, element) {
                var z = parseInt($(element).css("z-index"));
                if (z > last_z)
                    last_z = z;
            }).get();
            var new_z = last_z + 1;

            el.css({ "z-index": new_z });

            if (!EvidenceManual)
                toEvidence(el, 1500);

            if (callback)
                callback(new_z);
        }

        function toEvidence(el, removeTime) {

            el.addClass('evidence');

            if (removeTime !== "undefined" && removeTime !== null) {
                setTimeout(function () {
                    el.removeClass('evidence');
                }, removeTime);
            }

        }

        return protected;
    }());

    var Taskbar = (function () {
        function protected() { }

        protected.Init = function () {
            eventBtnMinimizeAll();
            //updatePreviewsTaskbox();
        };

        protected.AddTask = function (w, windows, callback) {
            addTask(w, windows, callback);
        };

        protected.RemoveTask = function (w) {

            $("#taskbox" + w.Id).fadeOut(100, function () {
                $("#taskbox" + w.Id).parent().remove();

                if (refreshCounter(w) == 0) {
                    $("#task" + w.Task.Id).fadeOut(100, function () {
                        $("#task" + w.Task.Id).remove();
                    });
                }
            });
        };

        function refreshCounter(w) {
            var countTask = $("#task" + w.Task.Id + " .apps").children().length;
            $("#task" + w.Task.Id + " .ico .counter").html(countTask);
            return countTask;
        }

        function getTask(id, callback) {
            Util.Find(Window.GetWindows(), "obj.Task.Id == '" + id + "'", function (obj, i) {
                if (callback)
                    callback(obj);
            }, function () {
                if (callback)
                    callback(null);
            });
        }

        function addTask(w, windows, callback) {
            Util.Find(windows, "obj.AppId == '" + w.AppId + "'", function (obj, i) {
                addWindowToTask(w, callback);
            }, function () {
                addTaskItem(w, callback);
            });
        }

        function addTaskItem(w, callback) {
            setDefaultConfigTask(w, function (task) {

                var html = Component.Task.Item(task.Id, task.Ico);

                $(".task-area").append(html);

                addWindowToTask(w, callback, task);
            });
        }

        function addWindowToTask(w, callback, task) {
            var html = Component.Task.Box(w.Id, w._window.Parameters.Title);

            if (!task) {
                getTask(w.AppId, function (_w) {
                    $("#task" + _w.Task.Id + " .apps").append(html);

                    w.Task = _w.Task;
                    refreshCounter(w);

                    commonEventsTask(w, w.Task);

                    if (callback)
                        callback();
                });
            }
            else {
                $("#task" + task.Id + " .apps").append(html);
                w.Task = task;
                refreshCounter(w);

                commonEventsTask(w, task);

                if (callback)
                    callback();
            }
        }

        function commonEventsTask(w, task) {
            $("#taskbox" + w.Id + " .btn-close").click(function () {
                Window.TriggerClose(w._element);
            });

            $("#taskbox" + w.Id + " .box-container").click(function () {
                if (w.Exhibition == window_status_exhibition.MINIMIZED) {
                    Window.TriggerMinimize(w._element);
                }
                else {
                    Window.ToFront(w._element);
                }
            });
        }

        function setDefaultConfigTask(w, callback) {

            var task = {
                Id: Util.SimpleValidation(w.AppId, "undefinedAppId"),
                Ico: Util.SimpleValidation(w._window.Parameters.Ico, w._window.Parameters.Title.substring(0, 1).toUpperCase()),
            };

            callback(task);
        }

        function eventBtnMinimizeAll() {
            $(".btn-minimize-all").click(function () {
                Util.UpdateCollection(Window.GetWindows(), function (w) {
                    if (w.Exhibition !== window_status_exhibition.MINIMIZED) {
                        $(w._element).find(".btn-minimize").trigger("click");
                    }
                });
            });
        }

        function updatePreviewsTaskbox() {
            Core.Threads.Add(function () {

                Util.Each(Window.GetWindows(), "obj.Exhibition !== 'MINIMIZED'", function (w) {
                    public.PrintArea($("#window" + w.Id + " .body"), function (canvas) {
                        var myImage = canvas.toDataURL("image/jpg");
                        $("#taskbox" + w.Id + " .box-container").html("<img src='" + myImage + "'/>");
                    });
                });

            }, 5000, "Refresh Print Previews Taskbox");
        }

        return protected;
    }());

    var StartMenu = (function () {
        function protected() { }



        return protected;
    }());

    var NotificationArea = (function () {
        function protected() { }



        return protected;
    }());

    var Icons = (function () {
        function protected() { }

        protected.Init = function () {

        };

        protected.LoadIcons = function () {

        };

        function loadIcons() {

        }

        return protected;
    }());

    return public;
}());

