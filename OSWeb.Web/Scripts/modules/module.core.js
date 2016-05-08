﻿var Core = (function () {
    function public() { }

    var threads = new Array();

    public.Threads = {
        Get: function () {
            return threads;
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
        Alert: function(message, callbackOk) {
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

    var Thread = {
        New: function (method, time, callback) {
            if (!method) throw new Exception('Function not specified');
            if (!time) time = 1000;
            var t = setInterval(method, time);
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