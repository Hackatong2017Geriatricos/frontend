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
	$('.geriatrico .direccion').innerHTML = geriatrico.direccion;
}

/**
 * @desc Esta funcion va a ser llamada cada vez que se quiera agregar un icono en el mapa
 * @param  {Object} geriatrico - El objeto que contiene toda la informacion del geriatrico
 */
function mostrarIconoEnMapa(geriatrico) {
	var marker = new google.maps.Marker({
		position: geriatrico.coor,
		map: map,
		title: geriatrico.nombre
	});

	var templateFinal = templateMapa
		.replace('{nombre}', geriatrico.nombre)
		.replace('{direccion}', geriatrico.direccion);

	var infowindow = new google.maps.InfoWindow({
		content: templateFinal
	});

	marker.addListener('click', function() {
		if (infoWindowVisible) {
			infoWindowVisible.close();
		}

		infowindow.open(map, marker);
		infoWindowVisible = infowindow;

		mostrarInformacion(geriatrico);
	});

	todosLosMarkers.push(marker);
}

/**
 * @desc Esta funcion va a ser ejecutada cada vez que se escriba una letra en el buscador
 */
function filtrar() {
	var nombre = $('.buscarPorNombre').value.trim();

	if (nombre.length > 0) {
		todosLosMarkers.forEach(function(marker) {
			marker.setMap(null);
		});

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

	map = new google.maps.Map($('.mapa'), { center: cordoba, zoom: 12 });

	geriatricos.forEach(mostrarIconoEnMapa);
}

window.onload = function() {
	$('.buscarPorNombre').onkeyup = filtrar;
};
