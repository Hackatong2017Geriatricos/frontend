import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import IconoDeMapa from 'componentes/IconoDeMapa';
import config from 'config';
import './estilos.css';

class Mapa extends Component {
  state = {
    center: { lat: -31.41, lng: -64.18 },
    zoom: 12,
    /**
     * @example
     * { lat: 59.955413, lng: 30.337844 }
     * Mas informacion: https://github.com/istarkov/google-map-react
     * @type {Array}
     */
    puntosEnMapa: [
      { lat: -31.41, lng: -64.18 }
    ]
  }

  render() {
    return (
      <div className="Mapa">
        <GoogleMap
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
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
                key={index} {...punto} />)
          }
        </GoogleMap>
      </div>
    );
  }
}

export default Mapa;
