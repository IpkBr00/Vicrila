var HojaCotizacionComercial = function(options){
    this.propiedades = options;

    this.factoria  = undefined;
    this.solucionesDS = undefined;
    this.navisionDS = undefined;
    this.cliente = undefined;

    var that = this;
    this.intervalID = setInterval( function() { that.comprobarNavision(); }, 5000);

    this.idSolucion = undefined;
    this.solucion = undefined;
    this.dossier = undefined;

    return this;
};

HojaCotizacionComercial.prototype.comprobarNavision = function(){
    if(this.cliente != undefined)
    {
        this.cargarDatosSolucion();
        clearInterval(this.intervalID);
    }
    else
    {
    }

};

HojaCotizacionComercial.prototype.create = function(){
    var that = this,
        contenedor = "body";

    if(this.propiedades && this.propiedades.contenedor)
        contenedor = this.propiedades.contenedor;

    this.html = $(contenedor).load('../js/componentes/html/hojaCotizacionComercial.html', function(){
        that.inicializarComponentes();
        that.inicializarUI();
        that.inicializarEventos();
    });
};
HojaCotizacionComercial.prototype.inicializarComponentes = function(){
    var that = this;
    this.navisionDS = new IpkRemoteDataSourceNavision();
    this.navisionDS.onEjecutarFiltro = function(){
        var respuesta = arguments[0];
        if(respuesta.tieneDatos){
            var registro = respuesta.datos[0];
            if(registro["Search_Name"])
            {
                that.cliente = registro["No"] + " - " + registro["Name"];
            }
            else
            {
                that.incoterm = registro["No"] + " - " + registro["Description"];
            }
        }
    };

    this.factoria = new IpkRemoteFactory();
    this.factoria.onGetRemoteDataSource = function(eventArgs){
        that.solucionesDS = eventArgs.control;
        that.solucionesDS.onBuscar = function(respuesta){

            that.solucion = respuesta.datos[0];
            if(that.solucion.Dossier.CodCliente != -1)
                that.navisionDS.EjecutarFiltro("CustomerList",{"Inactive_Customer":"0","No": that.solucion.Dossier.CodCliente },0);
            else
            {
                that.cliente = (that.solucion.Dossier.NombreClteSolicitante == null)? "" : that.solucion.Dossier.NombreClteSolicitante;
            }
        };

        if(that.idSolucion)
            that.cargarSolucion(that.idSolucion);
    };
    this.factoria.getRemoteDataSource('Solucion', 'SolucionDS');
};
HojaCotizacionComercial.prototype.inicializarUI = function(){
    this.btnExportar =  $("#btnExportar", this.html);
};
HojaCotizacionComercial.prototype.inicializarEventos = function(){
    var that = this;

    $(this.btnExportar).on('click', function(){
        $('#htmlHeader', this.html).remove();
        $('#excelHeader', this.html).show();
        that.write_to_excel('hojaCotizacionComercial', 'Hoja Cotizacion');
    });
};

HojaCotizacionComercial.prototype.cargarSolucion = function(Id, Dossier){
    this.dossier = Dossier;
    this.idSolucion = Id;
    if(this.solucionesDS)
        this.solucionesDS.Buscar({'IdSolucion': Id}, true, true);
};
HojaCotizacionComercial.prototype.cargarDatosSolucion = function(){
    var contexto = $('#hojaCotizacionComercial', this.html);
    $('#hojaCotizacionComercial *', this.html).remove();
    $('#hojaCotizacionComercialTemplate', this.html).tmpl(this.formatearDatos()).appendTo(contexto);
};
HojaCotizacionComercial.prototype.formatearDatos = function(){
    var dossier = this.solucion.Dossier;
    var datos = {};

    datos.NumDemanda = dossier.NumDemanda;
    datos.NumDossier = dossier.NumDossier;
    datos.FechaCreacion = dossier.FechaPeticion;
    datos.FechaCierre =  (dossier.FechaCierre.length > 9) ? dossier.FechaCierre.substr(0, 10) : dossier.FechaCierre;

    datos.DescripcionArt = dossier.DescripcionArt;
    datos.NombreClteSolicitante = this.cliente;
    //datos.NombreClteSolicitante = dossier.NombreClteSolicitante;
    datos.CodCliente = dossier.CodCliente;

    datos.NumeroSoluciones = (this.dossier.Solucion) ? this.dossier.Solucion.length : "";
    datos.Descripcion = this.solucion.Descripcion;
    datos.CostoEmbEnExterior = (this.solucion.CostoEmbEnExterior == null) ? 0 : formato_numero(parseFloat(this.solucion.CostoEmbEnExterior), 2, ',', '.');
    datos.CosteTransporte = (this.solucion.CosteTransporte == null) ? 0 : formato_numero(parseFloat(this.solucion.CosteTransporte), 2, ',', '.');
    datos.CostoEmbEnDirecto = (this.solucion.CostoEmbEnDirecto == null) ? 0 : formato_numero(parseFloat(this.solucion.CostoEmbEnDirecto), 2, ',', '.');
    datos.UnidadMedidaVenta = dossier.UnidadMedidaVenta;
    datos.PrecioCotizacion = (this.solucion.PrecioCotizacion == null) ? 0 : formato_numero(parseFloat(this.solucion.PrecioCotizacion), 2, ',', '.');
    datos.MargenEnDirecto = (this.solucion.MargenEnDirecto == null) ? 0 : formato_numero(parseFloat(this.solucion.MargenEnDirecto * 100), 2, ',', '.')+ "%";
    datos.MargenEnExterior = (this.solucion.MargenEnExterior == null) ? 0 : formato_numero(parseFloat(this.solucion.MargenEnExterior * 100), 2, ',', '.')+ "%";
    datos.CifraDeNegocio = this.solucion.CifraDeNegocio;
    datos.FechaValidez =  (this.solucion.FechaValidez.length > 9) ? this.solucion.FechaValidez.substr(0, 10) : this.solucion.FechaValidez;
    datos.FechaCierre = dossier.FechaCierre;
    datos.CantidadAFabricar = formato_numero(parseFloat(dossier.CantidadAFabricar), 2, ',', '.');
    datos.Tolerancia = dossier.Tolerancia;
    datos.Entregas = dossier.Entregas;
    datos.Observaciones = this.solucion.Observaciones;
    datos.MOQ = formato_numero(this.solucion.MOQ, 2, ',', '.');
    /*datos.FechaDisponibilidadNecesaria = dossier.FechaDisponibilidadNecesaria;
    datos.DisponibilidadFabricacion = dossier.DisponibilidadFabricacion;*/
    datos.FechaDisponibilidadNecesaria = this.solucion.DisponibilidadProducto;
    datos.DisponibilidadFabricacion = this.solucion.DisponibilidadElementos;

    return datos;
};
HojaCotizacionComercial.prototype.write_to_excel = function(table, name) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            })
        };

    if (!table.nodeType)
        table = document.getElementById(table);

    var ctx = {
        worksheet: name || 'Worksheet',
        table: table.innerHTML
    };
    //window.location.href = uri + base64(format(template, ctx))
    //window.location.href = uri + base64encode(format(template, ctx))
    window.location.href = uri + Base64.encode(format(template, ctx))
};
function base64encode (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    input = utf8_encode(input);

    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }

    function utf8_encode (string) {
        var string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    return output;
}

var Base64 = {
// private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

        }

        return output;
    },

// public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

// private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

// private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }
};


function formato_numero(numero, decimales, separador_decimal, separador_miles){ // v2007-08-06
    numero=parseFloat(numero);
    if(isNaN(numero)){
        return "";
    }

    if(decimales!==undefined){
        // Redondeamos
        numero=numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

    if(separador_miles){
        // Añadimos los separadores de miles
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
        while(miles.test(numero)) {
            numero=numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}