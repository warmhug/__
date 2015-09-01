/*=============================================================================
#     FileName: jquery.url.js
#         Desc: a plugin parse the url
#       Author: Smeagol
#        Email: star212417@163.com
#     HomePage: http://www.quxing.info
#      Version: 0.0.1
#   LastChange: 2011-12-05 15:05:20
#      History:
=============================================================================*/
(function ($) {

    var queryKey;
    var uri = {}; //用于存放url解析出来的各个部分，名称在key这个数组中命名的
    var methods = {
        init: function (options) {
            var opts = $.extend({}, $.url.defaults, options);
            str = decodeURI(opts.url);
            var m = opts.parser[opts.strictMode ? "strict" : "loose"].exec(str);
            //console.log(m);
            var i = 14;
            while (i--) {
                uri[opts.key[i]] = m[i] || "";
            }
            console.log(uri);
            uri[opts.q.name] = {};
            uri[opts.key[12]].replace(opts.q.parser, function ($0, $1, $2) {
                if ($1) {
                    uri[opts.q.name][$1] = $2;
                }
            });
            queryKey = uri.queryKey;
            //console.log(uri.queryKey);//查询的字段
            return this;
        },
        setQuery: function (obj) {
            queryKey = $.extend(queryKey, obj);
            //console.log(queryKey);
        },
        getQuery: function () {
            return queryKey;
        },
        getFile: function () {
            return uri.file;
        }
    };

    $.url = function (method) {

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }

    };
    $.url.defaults = {
        url: window.location,
        strictMode: false,
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        },
        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q: { name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g }
    };

    methods.init();

})(jQuery);

