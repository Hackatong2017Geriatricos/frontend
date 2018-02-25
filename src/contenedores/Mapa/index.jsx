import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import IconoDeMapa from 'componentes/IconoDeMapa';
import config from 'config';
import './estilos.css';

class Mapa extends Component {
  state = {
    center: { lat: 10, lng: -35 },
    zoom: 0,
    points: []
  }

  render() {
    return (
      <div className="Mapa">
        <GoogleMapReact
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          bootstrapURLKeys={{key: config.googleMaps.apiKey}}>
          {
            this.state.points.map((point, index) => <IconoDeMapa key={index} {...point} />)
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Mapa;
