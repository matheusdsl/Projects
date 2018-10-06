var Util = parent.Util;
var Core = parent.Core;

var E$ = (function () {
    function public() { }

    var appTest;

    Util.Ajax("/Ui/AppTest", null,
                function (data) {
                    appTest = data;
                    $("html").html(data);
                });
    
    
    

    return public;
}());