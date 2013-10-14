(function ($) {
    var o = $({});
    $.subscribe = function () {
        o.on.apply(o, arguments);
    };
    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };
    $.publish = function () {
        o.trigger.apply(o, arguments);
    };
} (jQuery));

(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

function inputToJson(container){
	var obj = {};	

	$.each($( container + ' input[type != button],' + container + ' select,' + container + ' textarea'), function(){
			if(this.type == 'checkbox')
				obj[this.name] = $(this).attr('checked') == 'checked' ? "SI" : "NO";
			else
				obj[this.name] = $(this).val();
	});

	return obj;
	//return JSON.stringify(obj);
};

function esconderNavSP(){
    $('#s4-leftpanel').hide();
    $('#MSO_ContentTable').css('margin-left', '25px');
}