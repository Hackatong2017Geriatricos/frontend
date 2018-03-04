import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import IconoDeMapa from 'componentes/IconoDeMapa';
import acciones from 'acciones';
import config from 'config';
import './estilos.css';

class Buscador extends Component {
  geriatricos = [];

  state = {
    nombre: '',
    mostrarSoloHabilitados: false,
    center: { lat: -31.41, lng: -64.18 },
    zoom: 12,

    /**
     * @example
     * { lat: 59.955413, lng: 30.337844 }
     * Mas informacion: https://github.com/istarkov/google-map-react
     * @type {Array}
     */
    puntosEnMapa: [],

    /**
     * Tarjetas son las tarjetas que se ven en el menu izquierdo, debajo del buscador.
     * @type {Array}
     */
    tarjetas: []
  };

  geriatricos = [];

  constructor(props) {
    super(props);

    acciones.geriatricos.obtenerTodos().then((geriatricos) => {
      this.geriatricos = geriatricos;
      this.filtrarPuntosEnMapa();
    });
  }

  onChangeNombre = ($evento) => {
    this.setState({ nombre: $evento.target.value }, this.filtrarPuntosEnMapa);
  };

  filtrarPuntosEnMapa = () => {
    const { nombre, mostrarSoloHabilitados } = this.state;
    let puntos = this.geriatricos;

    if (nombre) {
      puntos = puntos.filter((item) => item.nombre.toLowerCase().indexOf(nombre.trim().toLowerCase()) !== -1);
    }

    if (mostrarSoloHabilitados) {
      puntos = puntos.filter((item) => item.estado_habilitacion.toLowerCase() === 'habilitado')
    }

    this.setState({
      puntosEnMapa: puntos.map((x) => ({ lat: x.latitud, lng: x.longitud })),
      tarjetas: puntos
    });
  }

  onChildClick = (id) => {
    console.log(id);
  }

  onChildMouseEnter = (id, a, b, c) => {
    console.log(id, a, b, c);
  }

  onChildMouseLeave = (id) => {
    console.log(id);
  }

  onClickFiltrarHabilitados = () => {
    this.setState({
      mostrarSoloHabilitados: !this.state.mostrarSoloHabilitados
    }, this.filtrarPuntosEnMapa);
  }

  render() {
    return (
      <div className="Buscador">
        <div className="izquierda">
          <div className="buscador">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={this.state.nombre}
              onChange={this.onChangeNombre} />
              <i className="fas fa-search"></i>
          </div>

          <div className="tarjetas">
            {
              this.state.tarjetas.map((geriatrico, index) =>
                <div className="tarjeta" key={index}>
                  <div className="nombre">{geriatrico.nombre}</div>

                  <div className="estado">
                    {geriatrico.estado_habilitacion} <i className="fas fa-question-circle"></i>
                  </div>

                  {
                    geriatrico.direccion &&
                      <div className="direccion">
                        <i className="fas fa-map-marker-alt"></i>
                        {geriatrico.direccion}
                      </div>
                  }

                  {
                    geriatrico.telefono &&
                      <div className="telefono">
                        <i className="fas fa-phone"></i>
                        {geriatrico.telefono}
                      </div>
                  }

                  {
                    geriatrico.email &&
                      <div className="email">
                        <i className="fas fa-envelope"></i>
                        <a href={`mailto:${geriatrico.email}`}>
                          {geriatrico.email}
                        </a>
                      </div>
                  }

                  {
                    geriatrico.web &&
                      <div className="web">
                        <i className="fas fa-hand-pointer"></i>
                        {geriatrico.web}
                      </div>
                  }
                </div>
              )
            }
          </div>
        </div>

        <div className="derecha">
          <div className="filtroSoloHabilitados" onClick={this.onClickFiltrarHabilitados}>
            <input type="checkbox" checked={this.state.mostrarSoloHabilitados} /> Mostrar sólo geriátricos habilitados
          </div>

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
