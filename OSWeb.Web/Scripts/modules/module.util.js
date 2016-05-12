var Util = (function () {
    function public() { }

    var auxDataId = 0;

    public.GetDataId = function (prefix) {
        auxDataId++;
        if (!prefix) prefix = "";
        var uk = prefix + "000" + auxDataId + "M4tH3u5" + Math.random().toString(36).substr(2, 5);
        return uk;
    };

    public.GetDataIdAux = function () {
        return auxDataId;
    };

    public.Ajax = function (url, obj, successCallback, errorCallback, completeCallback, beforeCallback) {
        if (beforeCallback)
            beforeCallback();
        $.ajax({
            type: 'POST',
            url: url,
            data: obj,
            timeout: 5000,
            success: function (data) {
                if (successCallback)
                    successCallback(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (errorCallback)
                    errorCallback(xhr, ajaxOptions, thrownError);
            },
            complete: function () {
                if (completeCallback)
                    completeCallback();
            }
        });
    };

    public.Clone = function (obj, callback) {
        var clone = Object.create(obj);
        if (callback)
            callback(clone);
        return clone;
    };

    public.FindArray = function (array, condition, callback) {
        var result = new Array();
        if (array.length <= 0) {
            callback(result);
            return;
        }
        for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            if (condition && eval(condition)) {
                result.push(obj);
            }
        }
        if (callback)
            callback(obj, i);
    };

    public.Find = function (array, condition, callback, callbackNotFound) {
        if (array.length <= 0) {
            if (callbackNotFound)
                callbackNotFound();
        }
        else {
            for (var i = 0; i < array.length; i++) {
                var obj = array[i];
                if (condition && eval(condition)) {
                    if (callback)
                        callback(obj, i);
                    return;
                }
            }
            if (callbackNotFound)
                callbackNotFound();
        }
    }

    public.Each = function (array, condition, callback) {

        for (var i = 0; i < length; i++) {
            var obj = array[i];
            if (condition && eval(condition)) {
                if (callback)
                    callback(obj, i);
            }
        }
    }

    public.RemoveFromArray = function (array, i) {
        array.splice(i, 1);
    };

    public.UpdateCollection = function (array, callback, finishCallback) {

        $.grep(array, function (obj, i) {
            if (callback) callback(obj, i);

            if (finishCallback && array.length == i + 1) {
                finishCallback(array);
            }
        });
    };

    public.Sleep = function (method, time) {
        return setTimeout(method, time);
    };

    public.SimpleValidation = function (obj, value) {
        if (typeof (obj) == "undefined" || obj === null)
            return value;
        return obj;
    }

    public.Now = {
        DateTime: function () {
            return getDateTime(true, true, true, true);
        },
        Date: function () {
            return getDateTime(true, true, false, false);
        },
        DateWithoutYear: function () {
            return getDateTime(true, false, false, false);
        },
        Time: function () {
            return getDateTime(false, false, true, true);
        },
        TimeWithoutSec: function () {
            return getDateTime(false, false, true, false);
        },
        DateTimeWithoutYear: function () {
            return getDateTime(true, false, true, true);
        },
        DateTimeWithoutSec: function () {
            return getDateTime(true, true, true, false);
        },
        DateTimeWithoutYearAndSec: function () {
            return getDateTime(true, false, true, false);
        }
    };

    public.Thread = function (method, time, name, instance) {
        var thread = {
            id: Util.GetDataId("thread"),
            neme: name ? name : "Unnamed",
            method: method,
            instance: instance,
            time: time
        };
        return thread;
    }

    //private
    function getDateTime(date, dateWithYear, time, timeWithSec) {
        var d = new Date();

        function fix(data) {
            return data.toString().length < 2 ? ("0" + data) : data.toString();
        }

        var day = fix(d.getDate());
        var month = fix(d.getMonth());
        var year = fix(d.getFullYear());
        var hour = fix(d.getHours());
        var min = fix(d.getMinutes());
        var sec = fix(d.getSeconds());

        if (date && time)
            return getFormatedDate(day, month, year, dateWithYear) + " " +
                   getFormatedTime(hour, min, sec, timeWithSec);
        else if (date)
            return getFormatedDate(day, month, year, dateWithYear);
        else if (time)
            return getFormatedTime(hour, min, sec, timeWithSec);
        else
            return d;
    }

    function getFormatedDate(day, month, year, withYear) {
        var x = day + "/" + month;
        if (withYear)
            x += "/" + year;
        return x;
    }

    function getFormatedTime(hour, min, sec, withSec) {
        var x = hour + ":" + min;
        if (withSec)
            x += ":" + sec;
        return x;
    }



    return public;
}());