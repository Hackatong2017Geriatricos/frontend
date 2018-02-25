import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import IconoDeMapa from 'componentes/IconoDeMapa';
import acciones from 'acciones';
import config from 'config';
import './estilos.css';

class Buscador extends Component {
  state = {
    center: { lat: -31.41, lng: -64.18 },
    zoom: 12,
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

  onChildClick = (id) => {
    console.log(id);
  }

  onChildMouseEnter = (id) => {
    console.log(id);
  }

  onChildMouseLeave = (id) => {
    console.log(id);
  }

  render() {
    return (
      <div className="Buscador">
        <div className="izquierda">
          <input
            type="text"
            placeholder="Buscar por nombre"
            onChange={this.onChangeNombre} />
          <i className="fas fa-search"></i>
        </div>

        <div className="derecha">
          <GoogleMap
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            onChildClick={this.onChildClick}
            onChildMouseEnter={this.onChildMouseEnter}
            onChildMouseLeave={this.onChildMouseLeave}
            bootstrapURLKeys={{
              key: config.googleMaps.apiKey,
              // TODO: Eliminar esto en un futuro y probar hacer zoom en el mapa.
              // Actualmente, tengo que forzar el uso de `3.30` porque al hacer
              // zoom en el mapa, los Markers (puntos del mapa) se re-dibujan
              // mediante una animacion desde las esquinas del mapa.
              // Parece ser un bug de la nueva version de Google Maps.
              // Mas info: https://github.com/istarkov/google-map-react/issues/510
              v: '3.30'
            }}>
            {
              this.state.puntosEnMapa.map((punto, index) =>
                <IconoDeMapa
                  key={index}
                  lat={punto.lat}
                  lng={punto.lng} />
              )
            }
          </GoogleMap>
        </div>
      </div>
    );
  }
}

export default Buscador;
