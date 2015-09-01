

    var util;
    util = {

    	browser : (function(ua){
			var device = '', version = '', android, ipad, iphone;
	        (android = ua.match(/(Android)\s+([\d.]+)/)) && (device = 'android') && (version = android[2]) ||
	        (ipad = ua.match(/(iPad).*OS\s([\d_]+)/)) && (device = 'ipad') && (version = ipad[2].replace(/_/g, '.')) ||
	        (iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)) && (device = 'iphone') && (version = iphone[2].replace(/_/g, '.'));
	        return { device: device, version: version.split('.'), mainVer: version.replace(/^(\d\.\d).*$/, '$1') };
    	})(navigator.userAgent),

    	log : function(value){
    		var ele = document.getElementById('test_log_element');
	        if (ele != null) {
	            ele.innerHTML += '<br />' + value;
	        } else {
	            var span = document.createElement('span');
	            span.id = "test_log_element";
	            span.innerHTML = value;
	            span.style.cssText = "position:fixed;left:0;top:0;background:rgba(0,0,0,.5);color:#fff;padding:5px";
	            document.body.appendChild(span);
	        }
    	},

    	// 保留两位小数
    	toDecimal: function(x) {  
	        var f = parseFloat(x); 
	        if (isNaN(f)) return; 
	        f = Math.round(x*100)/100;  
	        return f;  
	    }  
    }

    module.exports = util;
