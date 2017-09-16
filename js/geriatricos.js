var $ = document.querySelector.bind(document);
var map = null;
var geriatricos = [
	{ nombre: 'Bla bla', coor: { lat: -31.4164778, lng: -64.1919612 }, direccion: 'Indep.' },
	{ nombre: 'Otro mas', coor: { lat: -31.41, lng: -64.19 }, direccion: 'Estrada' }
];
var template = '<div id="icono">Nombre: {nombre}<br />Direccion: {direccion}</div>';

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

		var templateFinal = template
			.replace('{nombre}', geriatrico.nombre)
			.replace('{direccion}', geriatrico.direccion);

		var infowindow = new google.maps.InfoWindow({
			content: templateFinal
		});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
	});
}

window.onload = function() {
	//
};
