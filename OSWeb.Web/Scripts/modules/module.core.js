var Core = (function () {
    function public() { }

    var threads = new Array();

    public.Threads = {
        Get: function () {
            return threads;
        },
        Find: function (name, callback) {
            Util.Find(Core.Threads.Get(), "obj.name === '" + name + "'", function (thread) {
                callback(thread);
            });
        },
        Add: function (method, time, name) {
            var obj;
            if (method && time) {
                obj = Util.Thread(method, time, name);
                obj.instance = Thread.New(obj.method, obj.time);
                threads.push(obj);
            }
            else {
                Exception("Please, insert the function and time of thread.");
                return;
            }
            return obj;
        },
        Remove: function (obj) {
            Util.Find(threads, "obj.id == '" + obj.id + "'", function (thread, i) {
                Thread.Stop(obj.instance);
                Util.RemoveFromArray(threads, i);
            }, function () {
                Exception("Thread not found.");
            });
        },
        RemoveByName: function (name) {
            public.Threads.Find(name, function (thread) {
                Core.Threads.Remove(thread);
            });
        }
    };

    public.Init = function (callback) {
        Util.Sleep(function () {
            Ui.Init(function () {
                NativeApps.Init(function () {
                    callback();
                    Ui.RemoveLoading();
                });
            });
        }, 500);
    };

    public.Popup = {
        Alert: function (message, callbackOk) {
            var selectorOk = Util.GetDataId("btnOk");
            NativeApps.PopupAlert(message, selectorOk, function (window) {
                $("#" + selectorOk).click(function () {
                    callbackOk(window);
                });
            });
        },
        Confirm: function (message, callbackOk, callbackCancel) {
            var selectorOk = Util.GetDataId("btnOk");
            var selectorCancel = Util.GetDataId("btnCancel");
            NativeApps.PopupConfirm(message, selectorOk, selectorCancel, function (window) {
                $("#" + selectorOk).click(function () {
                    callbackOk(window);
                });
                $("#" + selectorCancel).click(function () {
                    callbackCancel(window);
                });
            });
        },
        Error: function (message) {
            NativeApps.PopupError(message);
        },
        Offline: function (title, message) {
            NativeApps.PopupOffline(title, message, function (obj) {
                $(".work-area").append(obj.html);
                Ui.MakeDraggable($("#popupOffline" + obj.id), {});
                $("#btnClose" + obj.id).click(function () {
                    $("#popupOffline" + obj.id).remove();
                });
            });
        }
    };

    public.Notifications = function () {

    };

    public.BaseConfigApp = {
        AppId: null,
        Name: null,
        Title: null,
        Ico: null,
        Body: null,
        Render: function () {
            return null;
        },
        Resize: null,
        Minimize: null,
        Resizable: null,
        Draggable: null,
        Height: null,
        Width: null,
        XLocation: null,
        YLocation: null,
        Background: null,
        Calls: {
            onClose: function () {
                return null;
            },
            onResize: function () {
                return null;
            },
            onResizeStop: function () {
                return null;
            }
        },
    };

    var Thread = {
        New: function (method, time, callback) {
            if (!method) throw new Exception('Function not specified');
            if (!time) time = 1000;
            var i = 0;
            var t = {
                number: setInterval(function () {
                    method();
                    i++;
                }, time),
                qtdHistory: function () {
                    return i;
                }
            };
            if (callback) callback(t);
            return t;
        },
        Stop: function (thread, callback) {
            clearInterval(thread);
            if (callback) callback();
        }
    };


    return public;
}());