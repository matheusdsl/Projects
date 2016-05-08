Core.Init(function () {

    $(".startmenu").click(function () {

        teste();

        NativeApps.TextEditor();

    });

    function teste() {
        Core.Popup.Alert("Teste de Mensagem asdfasdfa sdfasdf asd fasdf asdf asd fas dfasdfasdfasdfasdf asdfasdfasdf",
            function (window) {
                Core.Popup.Error("OK");
            });
    }

});




