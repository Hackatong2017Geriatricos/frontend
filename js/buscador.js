var $ = document.querySelector.bind(document);
var map = null;
var geriatricos = [
	{ nombre: 'Bla bla', coor: { lat: -31.4164778, lng: -64.1919612 }, direccion: 'Indep.' },
	{ nombre: 'Otro mas', coor: { lat: -31.41, lng: -64.19 }, direccion: 'Estrada' }
];
var templateMapa = '<div id="icono">Nombre: {nombre}<br />Direccion: {direccion}</div>';
var infoWindowVisible = null;

/**
 * @desc Esta funcion va a ser llamada cada vez que se haga click en un punto en el mapa (Marker).
 * Aca hay que hacer la logica relacionada a mostrar los datos del geriatrico, en el panel izquierdo,
 * debajo de los filtros
 * @param  {Object} geriatrico - El objeto que contiene toda la informacion del geriatrico
 */
function mostrarInformacion(geriatrico) {
	if ($('.info')) {
		$('.info').remove();
	}

	$('.geriatrico').style = '';
	$('.geriatrico .nombre').innerHTML = geriatrico.nombre;
	$('.geriatrico .direccion').innerHTML = geriatrico.direccion;
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

	geriatricos.forEach(function(geriatrico) {
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
	});
}

window.onload = function() {
	//
};
