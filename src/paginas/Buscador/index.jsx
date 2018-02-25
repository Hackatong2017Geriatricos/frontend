import React, { Component } from 'react';
import acciones from 'acciones';
import Mapa from 'contenedores/Mapa';
import './estilos.css';

class Buscador extends Component {
  state = {
    geriatricos: [],
    /**
     * @example
     * { lat: 59.955413, lng: 30.337844 }
     * Mas informacion: https://github.com/istarkov/google-map-react
     * @type {Array}
     */
    puntosEnMapa: [
      { lat: -31.42, lng: -64.18 }
    ]
  };

  geriatricos = [];

  constructor(props) {
    super(props);

    acciones.geriatricos.obtenerTodos().then((geriatricos) => {
      this.geriatricos = geriatricos;
      this.filtrarPuntosEnMapa('');
    });
  }

  onChangeNombre = ($evento) => {
    this.filtrarPuntosEnMapa($evento.target.value);
  };

  filtrarPuntosEnMapa = (nombre) => {
    this.setState({
      puntosEnMapa: this.geriatricos
        .filter((item) => item.nombre.toLowerCase().indexOf(nombre.trim().toLowerCase()) !== -1)
        .map((x) => ({ lat: x.latitud, lng: x.longitud }))
    });
  }

  render() {
    return (
      <div className="Buscador">
        <div className="izquierda">
          <input
            type="text"
            placeholder="Buscar por nombre"
            // value={this.state.nombre}
            onChange={this.onChangeNombre} />
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
