import React from 'react';
import './estilos.css';

const Tarjeta = ({ geriatrico, onClick }) =>
  <div className="Tarjeta" onClick={() => onClick(geriatrico)}>
    <div className="nombre">{geriatrico.nombre}</div>

    <div className={`estado ` + (geriatrico.estado_habilitacion === 'Habilitado' ? 'habilitado' : '')}>
      {geriatrico.estado_habilitacion.replace(/_/g, ' ')} <i className="fas fa-question-circle"></i>
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
      geriatrico.url &&
        <div className="web">
          <i className="fas fa-hand-pointer"></i>
          <a href={geriatrico.url}>
            {geriatrico.url}
          </a>
        </div>
    }
  </div>;

export default Tarjeta;
