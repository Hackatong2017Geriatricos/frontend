var $ = document.querySelector.bind(document);

window.onload = function() {
	// Cuando se refresca la pagina, volver a cargar la pagina en la que estaba el usuario
	var pagina = window.location.hash.replace('#', '');

	if (pagina.length > 0) {
		$('iframe').src = './' + pagina + '.html';
	}
};
