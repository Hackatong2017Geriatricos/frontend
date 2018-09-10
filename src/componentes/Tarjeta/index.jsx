import React from 'react';
import './estilos.css';

const Tarjeta = ({ geriatrico, activo = false, onMouseEnter, onMouseLeave, onClick }) =>
  <div
    className={`Tarjeta ${activo ? '--activa' : ''}`}
    onClick={() => onClick(geriatrico)}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
    <div className="nombre">{geriatrico.nombre}</div>

    {/* <div className={`estado ` + (geriatrico.estado_habilitacion === 'Habilitado' ? 'habilitado' : '')}>
      {geriatrico.estado_habilitacion.replace(/_/g, ' ')} <i className="fas fa-question-circle"></i>
    </div> */}

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
          <a href={`mailto:${geriatrico.email}`} target="_blank">
            {geriatrico.email}
          </a>
        </div>
    }

    {
      geriatrico.url &&
        <div className="web">
          <i className="fas fa-hand-pointer"></i>
          <a href={geriatrico.url} target="_blank">
            {geriatrico.url}
          </a>
        </div>
    }
  </div>;

export default Tarjeta;
