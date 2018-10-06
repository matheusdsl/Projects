var Exception = (function (message, callback) {
    function public(message, callback) {
        this.message = message;
        this.name = "Exception";
        if (callback) callback(this);
        
        return this;
    }

    public.Generic = function (message, callback) {
        this.message = message;
        this.name = "Generic Exception";
        if (callback) callback(this);

        return this;
    };

    return public;
}());