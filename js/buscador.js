var $ = document.querySelector.bind(document);
var map = null;
var geriatricos = [
	{ nombre: 'Padre Lamonaca', coor: { lat: -31.4164778, lng: -64.1919612 }, direccion: 'Independencia 880 2B, Nueva Cordoba, Cordoba, Argentina' },
	{ nombre: 'Geriatrico San Isidro', coor: { lat: -31.41, lng: -64.19 }, direccion: 'Estrada' }
];
var templateMapa = '<div id="icono">Nombre: {nombre}<br />Direccion: {direccion}</div>';
var infoWindowVisible = null;
var todosLosMarkers = [];

/**
 * @desc Esta funcion va a ser llamada cada vez que se haga click en un punto en el mapa (Marker).
 * Aca hay que hacer la logica relacionada a mostrar los datos del geriatrico, en el panel izquierdo,
 * debajo de los filtros
 * @param  {Object} geriatrico - El objeto que contiene toda la informacion del geriatrico
 */
function mostrarInformacion(geriatrico) {
	$('.geriatrico').style = '';
	$('.geriatrico .nombre').innerHTML = geriatrico.nombre;
	$('.geriatrico .estado').innerHTML = geriatrico.estado;
	$('.geriatrico .email').innerHTML = geriatrico.email;
	$('.geriatrico .direccion').innerHTML = geriatrico.direccion;
	$('.geriatrico .titular').innerHTML = geriatrico.titular;
	$('.geriatrico .cuit').innerHTML = geriatrico.cuit;
	$('.geriatrico .fechaInscripcion').innerHTML = geriatrico.fecha_inscripcion;
	$('.geriatrico .plazasHabilitadas').innerHTML = geriatrico.plazas_habilitadas;
}

/**
 * @desc Esta funcion va a ser llamada cada vez que se quiera agregar un icono en el mapa
 * @param  {Object} geriatrico - El objeto que contiene toda la informacion del geriatrico
 */
function mostrarIconoEnMapa(geriatrico) {
	// Creamos el icono a mostrar en el mapa
	var marker = new google.maps.Marker({
		position: geriatrico.coor,
		map: map,
		title: geriatrico.nombre
	});

	// Creamos el template a mostrar cuando se haga click en el icono previamente creado
	var templateFinal = templateMapa
		.replace('{nombre}', geriatrico.nombre)
		.replace('{direccion}', geriatrico.direccion);

	// El objeto `InfoWindow` es el tooltip que se muestra cuando se hace click en un icono del mapa
	var infowindow = new google.maps.InfoWindow({
		content: templateFinal
	});

	// Al hacer click en el Marker, abrimos el InfoWindow
	marker.addListener('click', function() {
		// Si hay algun infoWindow siendo visible, cerrarlo, porque ahora hay que mostrar otro.
		if (infoWindowVisible) {
			infoWindowVisible.close();
		}

		infowindow.open(map, marker);

		// Guardamos el infoWindows siendo mostrado para luego ocultarlo facilmente cuando se abra otro
		infoWindowVisible = infowindow;

		// Mostramos informacion detallada del geriatrico en el menu izquierdo
		mostrarInformacion(geriatrico);
	});

	// Guardamos el maker (icono) para tener la refrencia para luego poder eliminarlo (al filtrar)
	todosLosMarkers.push(marker);
}

/**
 * @desc Esta funcion va a ser ejecutada cada vez que se escriba una letra en el buscador
 */
function filtrar() {
	var nombre = $('.buscarPorNombre').value.trim();

	// Si el usuario ingresó un texto, filtrar
	if (nombre.length > 0) {
		// Ocultamos todos los iconos del mapa para mostrarlos solo los filtrados
		todosLosMarkers.forEach(function(marker) {
			marker.setMap(null);
		});

		// Recorremos todos los geriatricos, y mostramos solo los que coincidan con la busqueda
		geriatricos.forEach(function(geriatrico) {
			if (geriatrico.nombre.indexOf(nombre) !== -1) {
				mostrarIconoEnMapa(geriatrico);
			}
		});
	}
}

/**
 * @desc Esta function es ejecutada por la api de Google Maps cuando el mapa termina de cargarse.
 */
function iniciarMapa() {
	var cordoba = {
		lat: -31.4164778,
		lng: -64.1919612
	};

	// Creamos el mapa
	map = new google.maps.Map($('.mapa'), { center: cordoba, zoom: 12 });

	fetch(
		'https://hackatong2017-geriatricos.herokuapp.com/locales.json',
		{
			method: 'GET',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}
	)
	.then(function(r) { return r.json(); })
	.then(function(data) {
		// Si hay datos, mostrarlos
		if (Array.isArray(data) && data.length > 0) {
			geriatricos = data;

			// Mostramos todos los geristricos por defecto
			geriatricos.forEach(mostrarIconoEnMapa);
		}
	})
	.catch(function() {
		// Si hay un error en el endpoint... Hacer algo aca.
	});
}

window.onload = function() {
	// Cuando se filtre por nombre de geriatrico, filtrarlos en el mapa.
	$('.buscarPorNombre').onkeyup = filtrar;
};
