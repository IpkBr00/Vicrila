var VistaDosierCompleta = function (options) {
    this.inspectores = {
        Dossier: [],
        Solucion: [],
        FormaArt: [],
        Nivel: [],
        FormaEmb: []
    };
    this.dosier = options.dosier;
    this.soluciones = options.soluciones;
    this.$contenedor = options.contenedor;
    this.$dialogo = this.$contenedor.dialog({
        title: 'Vista de dosier completo',
        width: 1500,
        height: 750,
        modal: true,
        autoOpen: false
    });

    if (this.dosier && this.soluciones)
        this.inicializarUI();

    return this;
};

VistaDosierCompleta.prototype = {
    inicializarUI: function () {
        this.$dossierPlaceHolder = $('#dossier');
        this.$solucionesPlaceHolder = $('#soluciones');
        this.$articulosPlaceHolder = $('#articulos');
        this.$embalajesPlaceHolder = $('#embalajes');
        this.$botonImprimir = this.$contenedor.find('.print');
        this.$botonImprimir.on('click', function () {
            var mywindow = window.open('', '', 'height=800,width=1024');

            if ($.browser.webkit) {
                mywindow.document.write('<html><head><title>Vista completa dosier</title>');
                mywindow.document.write('<link rel="stylesheet" href="../css/base.css" type="text/css" media="all" /> ');
                mywindow.document.write('<style> *{ font-size: 7px;} .toTable table{ width : 200px;} .toTable table tbody tr td, .toTable table thead tr th{ width: 100px;} </style>');
                mywindow.document.write('</head><body >');
                mywindow.document.write($('#vistaCompletaDossier .content').html());
                mywindow.document.write('</body></html>');
                mywindow.document.close();
                setTimeout(function () {
                    mywindow.print();
                    mywindow.close();
                }, 2000);

            }
            else {
                mywindow.document.write('<html><head><title>Vista completa dosier</title>');
                mywindow.document.write('<link rel="stylesheet" href="../css/base.css" type="text/css" media="all" /> ');
                mywindow.document.write('<style> *{ font-size: 7px;} .toTable table{ width : 200px;} .toTable table tbody tr td, .toTable table thead tr th{ width: 100px;} </style>');
                mywindow.document.write('</head><body >');
                mywindow.document.write($('#vistaCompletaDossier .content').html());
                mywindow.document.write('</body></html>');
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
            }

        });
        var saltoLinea = $('<br>');

        this.limpiar();

        var configurationDossier = {
            tipo: "Dossier",
            placeHolder: this.$dossierPlaceHolder,
            record: this.dosier,
            options: { titulo: 'DOSIER', clase: 'colEmerland', modelo: 'Dossier' }
        };
        var configurationSolucion = {
            tipo: "Solucion",
            placeHolder: this.$solucionesPlaceHolder,
            record: {},
            options: { titulo: 'SOLUCION', clase: 'colPeterRiver', colapsable: true, modelo: 'Solucion' }
        };
        var configurationArticulo = {
            tipo: "FormaArt",
            placeHolder: this.$articulosPlaceHolder,
            record: {},
            options: { titulo: 'ARTICULO', clase: 'colCarrot', colapsable: true, modelo: 'FormaArt' }
        };
        var configurationEmbalajes = {
            tipo: "FormaEmb",
            placeHolder: this.$embalajesPlaceHolder,
            record: {},
            options: { titulo: 'EMBALAJE', clase: 'colAlizarin', colapsable: true, nivel: 1, modelo: 'FormaEmb' }
        };
        var configurationNivel = {
            tipo: "Nivel",
            placeHolder: this.$embalajesPlaceHolder,
            record: {},
            options: { titulo: 'NIVEL', clase: 'colAmethyst', colapsable: true, modelo: 'Nivel' }
        };

        this.crearInspector(configurationDossier);

        for (var i = 0; i < this.soluciones.length; i++) {
            configurationSolucion.record = this.soluciones[i];
            this.crearInspector(configurationSolucion);

            for (var j = 0; j < this.soluciones[i].FormaArt.length; j++) {
                configurationArticulo.record = this.soluciones[i].FormaArt[j];
                this.crearInspector(configurationArticulo);
            }
            for (var k = 0; k < this.soluciones[i].Nivel.length; k++) {
                configurationNivel.record = this.soluciones[i].Nivel[k];
                this.crearInspector(configurationNivel);

                for (var l = 0; l < this.soluciones[i].Nivel[k].FormaEmb.length; l++) {
                    configurationEmbalajes.record = this.soluciones[i].Nivel[k].FormaEmb[l];
                    this.crearInspector(configurationEmbalajes);

                }

            }
        }
    },
    limpiar: function () {
        this.$dossierPlaceHolder.find('*').remove();
        this.$solucionesPlaceHolder.find('*').remove();
        this.$articulosPlaceHolder.find('*').remove();
        this.$embalajesPlaceHolder.find('*').remove();
    },
    crearInspector: function (configuration) {
        var inspector = new ModelInspector(configuration.placeHolder, configuration.record, configuration.options);
        this.inspectores[configuration.tipo].push(inspector);
        inspector.render();
    },
    cargar: function (dosier, soluciones) {
        this.dosier = dosier;
        this.soluciones = soluciones;
        this.inicializarUI();
    },
    abrir: function () {
        this.$dialogo.dialog('open');
    },
    cerrar: function () {
        this.$dialogo.dialog('close');
    }
};