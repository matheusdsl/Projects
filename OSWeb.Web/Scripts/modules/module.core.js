var Core = (function () {
    function public() { }

    var windows = new Array();
    var applications = new Array();    
    var threads = new Array();

    public.Threads = {
        Get: function () {
            return threads;
        },
        Find: function (name, callback) {
            Util.Find(Core.Threads.Get(), "obj.name === '" + name + "'", function (thread) {
                callback(thread);
            }, function () {
                callback(false);
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
        Remove: function (obj, callback) {
            Util.Find(threads, "obj.id == '" + obj.id + "'", function (thread, i) {
                Thread.Stop(obj.instance.number);
                Util.RemoveFromArray(threads, i);
                if (callback)
                    callback();
            }, function () {
                Exception("Thread not found.");
            });
        },
        RemoveByName: function (name, callback) {
            public.Threads.Find(name, function (thread) {
                Core.Threads.Remove(thread, callback);
            });
        }
    };

    public.Applications = {
        Get: function () {
            return applications;
        },
        Find: function (name, callback) {
            Util.Find(applications, "obj.name === '" + name + "'", function (app) {
                callback(app);
            }, function () {
                callback(false);
            });
        },
        Add: function (app) {
            var obj;
            if (app) {
                applications.push(app);
            }
            else {
                Exception("App invalid.");
                return;
            }
            return obj;
        },
        Remove: function (obj) {
            Util.Find(applications, "obj.Id == '" + obj.Id + "'", function (app, i) {
                Util.RemoveFromArray(applications, i);
            }, function () {
                Exception("App not found.");
            });
        },
        Splice: function (index, qtd) {
            applications.splice(index, qtd);
        },
        Count: function () {
            return applications.length;
        }
    };

    public.Windows = {
        Get: function () {
            return windows;
        },
        FindByAppId: function (appId, callback) {
            Util.Find(windows, "obj.AppId === '" + appId + "'", function (w) {
                callback(w);
            }, function () {
                callback(false);
            });
        },
        FindByName: function (name, callback) {
            Util.Find(windows, "obj.name === '" + name + "'", function (w) {
                callback(w);
            }, function () {
                callback(false);
            });
        },
        Add: function (w) {
            var obj;
            if (w) {
                windows.push(w);
            }
            else {
                Exception("Window invalid.");
                return;
            }
            return obj;
        },
        Remove: function (obj) {
            Util.Find(windows, "obj.Id == '" + obj.Id + "'", function (w, i) {
                Util.RemoveFromArray(windows, i);
            }, function () {
                Exception("Window not found.");
            });
        },
        Splice: function (index, qtd) {
            windows.splice(index, qtd);
        },
        Count: function (appId, callback) {
            if (appId) {
                Util.Count(windows, "obj.AppId === '" + appId + "'", function (qtd) {
                    if (callback) callback(qtd);
                    return qtd;
                });
            }
            else {
                if (callback) callback(window.length);
                return windows.length;
            }
        }
    };

    public.Init = function (callback) {

        $(document).get(0).onkeypress = khandle;
        $("body").append("<div style='display:block' id='temp_area'></div>");
        Util.Sleep(function () {
            Ui.Init(function () {
                NativeApps.Init(function () {
                    callback();
                    Ui.RemoveLoading();


                    $(".work-area").append(Component.WorkArea.Icon(0, "<i class='fa fa-close' onclick='NativeApps.TaskManager();'></i>", "João Batista Leite Lima"));
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
            NativeApps.PopupError(message, function (w) {

            });
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
        AllowMultiple: null,
        Calls: {
            beforeClose: function (window, close) {
                return null;
            },
            onClose: function (window) {
                return null;
            },
            onResize: function (window) {
                return null;
            },
            onResizeStop: function (event, ui) {
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

    function khandle(e) {
        e = e || event

        var evt = e.type;
        //while (evt.length < 10) evt += ' '
        //showmesg(evt +
        //  ' keyCode=' + e.keyCode +
        //  ' which=' + e.which +
        //  ' charCode=' + e.charCode +
        //  ' char=' + String.fromCharCode(e.keyCode || e.charCode) +
        //  (e.shiftKey ? ' +shift' : '') +
        //  (e.ctrlKey ? ' +ctrl' : '') +
        //  (e.altKey ? ' +alt' : '') +
        //  (e.metaKey ? ' +meta' : ''), 'key'
        //)

        // if (document.forms.keyform[e.type + 'Stop'].checked) {
        alert(e.keyCode);
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)
        ///}
    }



    return public;
}());