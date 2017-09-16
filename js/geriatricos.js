var $ = document.querySelector.bind(document);
var map;

/**
 * @desc Esta function es ejecutada por la api de Google Maps cuando el mapa termina de cargarse.
 */
function iniciarMapa() {
	map = new google.maps.Map($('.mapa'), { center: { lat: -31.4164778, lng: -64.1919612 }, zoom: 12 });
}

window.onload = function() {
	//
};
