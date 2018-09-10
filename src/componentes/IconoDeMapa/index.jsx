import React from 'react';
import icon from './icono.png';
import './estilos.css';

const IconoDeMapa = (props) =>
  <img
    className={`IconoDeMapa ` + (props.hover ? 'hover' : '')}
    src={icon}
    alt="Geriatrico"
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave} />;

export default IconoDeMapa;
