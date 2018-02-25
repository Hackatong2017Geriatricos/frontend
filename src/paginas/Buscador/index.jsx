import React, { Component } from 'react';
import Mapa from 'contenedores/Mapa';
import './estilos.css';

class Buscador extends Component {
  state = {
    /**
     * @example
     * { lat: 59.955413, lng: 30.337844 }
     * Mas informacion: https://github.com/istarkov/google-map-react
     * @type {Array}
     */
    puntosEnMapa: [
      { lat: -31.41, lng: -64.18 }
    ]
  };

  render() {
    return (
      <div className="Buscador">
        <div className="izquierda">
          <input type="text" placeholder="Buscar por nombre" />
          <i className="fas fa-search"></i>
        </div>

        <div className="derecha">
          <Mapa puntos={this.state.puntosEnMapa} />
        </div>
      </div>
    );
  }
}

export default Buscador;
