import React from 'react';
import { Link } from 'react-router-dom';
import './estilos.css';

const Cabecera = (props) => {
  const { paginaActual } = props.match.params;

  return (
    <div className="Cabecera">
      <div className="contenido">
        <Link to="/"><div className="logo">Vejez Activa</div></Link>

        <nav>
          <Link
            className={ !paginaActual ? 'activo' : '' }
            to="/">Inicio</Link>

          <Link
            className={ paginaActual === 'buscador-de-geriatricos' ? 'activo' : '' }
            to="/buscador-de-geriatricos">Buscador de geriátricos</Link>

          <Link
            className={ paginaActual === 'derechos-de-los-mayores' ? 'activo' : '' }
            to="derechos-de-los-mayores">Derechos de los mayores</Link>
        </nav>
      </div>
    </div>
  );
}

export default Cabecera;
