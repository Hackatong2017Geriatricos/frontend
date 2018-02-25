import React, { Component } from 'react';
import Mapa from 'contenedores/Mapa';
import './estilos.css';

class Buscador extends Component {
  render() {
    return (
      <div className="Buscador">
        <div className="izquierda">
          <input type="text" placeholder="Buscar por nombre" />
          <i className="fas fa-search"></i>
        </div>

        <div className="derecha">
          <Mapa />
        </div>
      </div>
    );
  }
}

export default Buscador;
