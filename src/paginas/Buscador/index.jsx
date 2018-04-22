import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import IconoDeMapa from 'componentes/IconoDeMapa';
import Tarjeta from 'componentes/Tarjeta';
import acciones from 'acciones';
import config from 'config';
import './estilos.css';

class Buscador extends Component {
  geriatricos = [];
  map = null;
  maps = null;

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

  constructor(props) {
    super(props);

    acciones.geriatricos.obtenerTodos().then((geriatricos) => {
      this.geriatricos = geriatricos.filter(x => x.latitud !== 0);
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
      puntosEnMapa: puntos.map((x) => ({
        geriatrico: x,
        lat: x.latitud,
        lng: x.longitud,
        getPosition: () => new this.maps.LatLng({ lat: x.latitud, lng: x.longitud })
      }))
    }, this.filtrarTarjetas);
  }

  onChildClick = (id) => {
    // console.log(id);
  }

  onChildMouseEnter = (id, a, b, c) => {
    // console.log(id, a, b, c);
  }

  onChildMouseLeave = (id) => {
    // console.log(id);
  }

  onClickFiltrarHabilitados = () => {
    this.setState({
      mostrarSoloHabilitados: !this.state.mostrarSoloHabilitados
    }, this.filtrarPuntosEnMapa);
  }

  _onClickTarjeta = (geriatrico) => {
    this.setState({
      center: {
        lat: geriatrico.latitud,
        lng: geriatrico.longitud
      },
      zoom: 14
    });
  }

  obtenerPuntosVisibles = () => {
    if (!this.map) {
      return [];
    }

    return this.state.puntosEnMapa.filter((punto) =>
      this.map.getBounds().contains(punto.getPosition())
    );
  }

  /**
   * @description Si en el mapa hay menos de 20 puntos visibles, mostrarlos
   */
  filtrarTarjetas = () => {
    const puntosVisibles = this.obtenerPuntosVisibles();

    if (puntosVisibles.length < 20) {
      const tarjetas = puntosVisibles.map(punto => punto.geriatrico);
      tarjetas.sort((a, b) => a.nombre.trim().toLowerCase() > b.nombre.trim().toLowerCase());

      this.setState({ tarjetas });
    }
  }

  _onMapaInicializado = ({ map, maps }) => {
    this.map = map;
    this.maps = maps;
    this.filtrarTarjetas();
  }

  _onCambioEnMapa = (data) => {
    this.setState({ zoom: data.zoom }, this.filtrarTarjetas);
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
                <Tarjeta key={index} geriatrico={geriatrico} onClick={this._onClickTarjeta} />
              )
            }
          </div>
        </div>

        <div className="derecha">
          <div className="filtroSoloHabilitados" onClick={this.onClickFiltrarHabilitados}>
            <input type="checkbox" checked={this.state.mostrarSoloHabilitados} /> Mostrar sólo geriátricos habilitados
          </div>

          <GoogleMap
            center={this.state.center}
            zoom={this.state.zoom}
            onChildClick={this.onChildClick}
            onChildMouseEnter={this.onChildMouseEnter}
            onChildMouseLeave={this.onChildMouseLeave}
            bootstrapURLKeys={{ key: config.googleMaps.apiKey }}
            onChange={this._onCambioEnMapa}
            onGoogleApiLoaded={this._onMapaInicializado}
            yesIWantToUseGoogleMapApiInternals>
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
