import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import IconoDeMapa from 'componentes/IconoDeMapa';
import config from 'config';
import './estilos.css';

class Mapa extends Component {
  state = {
    center: { lat: -31.41, lng: -64.18 },
    zoom: 12,
  };

  render() {
    // TODO: Esto deberia ser "defaultProps" (al igual que this.props.puntos)
    const center = this.props.center || this.state.center;
    const zoom = this.props.zoom || this.state.zoom;

    return (
      <div className="Mapa">
        <GoogleMap
          defaultCenter={center}
          defaultZoom={zoom}
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
            (this.props.puntos || []).map((punto, index) =>
              <IconoDeMapa
                key={index} {...punto} />)
          }
        </GoogleMap>
      </div>
    );
  }
}

export default Mapa;
