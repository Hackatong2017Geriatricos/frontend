import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Cookies from 'js-cookie';
import IconoDeMapa from 'componentes/IconoDeMapa';
import Tarjeta from 'componentes/Tarjeta';
import acciones from 'acciones';
import config from 'config';
import gif from './vejez-activa.gif';
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
    showModal: !Cookies.get('mostrarModalEnBuscador'),

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

  onChangeNombre = (evento) => {
    this.setState({ nombre: evento.target.value }, this.filtrarPuntosEnMapa);
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
        hover: false,
        getPosition: () => new this.maps.LatLng({ lat: x.latitud, lng: x.longitud })
      }))
    }, this.filtrarTarjetas);
  }

  onIconoMouseEnter = (item) => {
    const puntosEnMapa = this.state.puntosEnMapa.map(
      x => ({ ...x, hover: x.geriatrico.nombre === item.geriatrico.nombre })
    );

    const tarjetas = this.state.tarjetas.map(
      x => ({ ...x, activo: x.nombre === item.geriatrico.nombre })
    );

    this.setState({ puntosEnMapa, tarjetas });
  }

  onIconoMouseLeave = (item) => {
    const puntosEnMapa = this.state.puntosEnMapa.map(
      x => ({ ...x, hover: false })
    );

    const tarjetas = this.state.tarjetas.map(
      x => ({ ...x, activo: false })
    );

    this.setState({ puntosEnMapa, tarjetas });
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
      zoom: this.state.zoom
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
    } else {
      this.setState({ tarjetas: [] });
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

  _cerrarModal = () => {
    this.setState({ showModal: false });
    Cookies.set('mostrarModalEnBuscador', false);
  }

  render() {
    return (
      <div className="Buscador">
        {
          this.state.showModal &&
            <div className="modal">
              <div
                className="fas fa-window-close icono-cerrar"
                onClick={this._cerrarModal}></div>

              <img src={gif} alt="Vejez Activa"/>
            </div>
        }
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
              // TODO: Implementar los textos aca. Si no hay tarjetas, avisarle
              // que haga zoom o que busque algo.

              // TODO: Hacer que al hacer HOVER aca, se setee "hover" en true
              // en el objeto "puntosEnMapa".
              this.state.tarjetas.map((geriatrico, index) =>
                <Tarjeta
                  key={index}
                  geriatrico={geriatrico}
                  activo={!!geriatrico.activo}
                  onClick={this._onClickTarjeta}
                  onMouseEnter={() => this.onIconoMouseEnter({geriatrico})}
                  onMouseLeave={() => this.onIconoMouseLeave({geriatrico})} />
              )
            }

            {
              this.state.tarjetas.length === 0 && this.state.nombre === ''
                ? <div className="explicacion">
                    Haz zoom en el mapa la zona que te interesa, o utiliza el buscador.<br />
                    Los resultados se mostrarán aquí.
                  </div>
                : ''
            }

            {
              this.state.puntosEnMapa.length === 0 && this.state.nombre !== ''
                ? <div className="explicacion">
                    En esta zona no encontramos resultados.<br />
                    Prueba con otro nombre, o cambia de zona.
                  </div>
                : ''
            }
          </div>
        </div>

        <div className="derecha">
          {/* <div className="filtroSoloHabilitados" onClick={this.onClickFiltrarHabilitados}>
            <input type="checkbox" checked={this.state.mostrarSoloHabilitados} /> Mostrar sólo geriátricos habilitados
          </div> */}

          <GoogleMap
            center={this.state.center}
            zoom={this.state.zoom}
            bootstrapURLKeys={{ key: config.googleMaps.apiKey }}
            onChange={this._onCambioEnMapa}
            onGoogleApiLoaded={this._onMapaInicializado}
            yesIWantToUseGoogleMapApiInternals>
            {
              this.state.puntosEnMapa.map((punto, index) =>
                <IconoDeMapa
                  key={index}
                  hover={punto.hover}
                  lat={punto.lat}
                  lng={punto.lng}
                  geriatrico={punto.geriatrico}
                  onMouseEnter={() => this.onIconoMouseEnter(punto)}
                  onMouseLeave={() => this.onIconoMouseLeave(punto)} />
              )
            }
          </GoogleMap>
        </div>
      </div>
    );
  }
}

export default Buscador;
