var $ = document.querySelector.bind(document);

/**
 * @desc Esta funcion va a ser usada para cambiar la URL cuando el usuario hace click en la barra de navegacion
 * @param  {String} pagina - El nombre que transformaremos a URL
 */
function cambiarURL(pagina) {
	// Eliminamos la clase "activo" de todos los <li>
	document.querySelectorAll('.navbar li').forEach(function(item) {
		item.classList.remove('activo');
	});

	// Agregamos la clase "activo" al <li> que se le hizo click
	$('.navbar li.' + pagina).classList.add('activo');

	// Cambiamos el contenido de la pagina
	$('iframe').src = './' + pagina + '.html';

	$('title').innerHTML = pagina.charAt(0).toUpperCase() + pagina.slice(1);
}

window.onload = function() {
	// Cuando se refresca la pagina, volver a cargar la pagina en la que estaba el usuario
	var pagina = window.location.hash.replace('#', '');

	if (pagina.length > 0) {
		cambiarURL(pagina);
	}
};
