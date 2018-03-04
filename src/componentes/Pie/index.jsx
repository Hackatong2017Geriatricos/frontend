import React from 'react';
import './estilos.css';
import fundeps from 'estilos/imagenes/fundeps.png';
// import municipalidad from 'estilos/imagenes/municipalidad.png';
// import nacion from 'estilos/imagenes/nacion.png';
// import provincia from 'estilos/imagenes/provincia.png';
import tic from 'estilos/imagenes/tic.png';

const Pie = () =>
  <div className="Pie">
    <div className="columna">
      <img src={fundeps} alt="Logo de Fundeps" />
    </div>

    {
      /*
        <div className="columna">
          <img src={municipalidad} alt="Logo de la Municipalidad" />
        </div>

        <div className="columna">
          <img src={nacion} alt="Logo de la Nacion" className="nacion" />
        </div>

        <div className="columna">
          <img src={provincia} alt="Logo de la Provincia" />
        </div>
       */
    }

    <div className="columna">
      <img src={tic} alt="Logo de TICs" />
    </div>
  </div>;

export default Pie;
