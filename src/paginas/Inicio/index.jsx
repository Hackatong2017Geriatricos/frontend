import React, { Component } from 'react';
import './estilos.css';

class Inicio extends Component {
  render() {
    return (
      <div className="Inicio">
        <div className="imagenGrande">
          <div className="lema">
            Una plataforma para visibilizar, promover y cumplir los derechos de las personas mayores
          </div>
        </div>

        <div className="contenido">
          <h1>¿Qué es “Vejez Activa”?</h1>
          <div className="texto">
            Es una iniciativa que surge de los derechos humanos consagrados de las personas mayores y la necesidad de promover y garantizar su cumplimiento. Argentina, como otros Estados de la región, se ha obligado a través de la Convención interamericana a adoptar medidas que tiendan a cumplir los derechos de las personas mayores de 60 años.
          </div>

          <br/>
          <br/>

          <h1>¿Qué hacemos?</h1>
          <div className="texto">
            Nos interesa visibilizar y sensibilizar sobre la vejez como una etapa de la vida, con sus particularidades. Por ello, difundimos la convención y el paradigma de envejecimiento activo que ésta propone, para que la comunidad y las personas sujetas de derecho sean concientizadas sobre los derechos humanos de los y las adultos mayores. Además, sabiendo que muchas familias optan por las instituciones geriátricas como residencia para las personas mayores, es importante que se haga en instituciones habilitadas de acuerdo a las normativas provinciales y municipales. Por ello, brindamos una herramienta que permita visualizar los geriátricos habilitados de la ciudad de Córdoba y la información correspondiente a cada institución.
          </div>

        </div>

        <div className="contenido links">
          <h1>Links de interés</h1>
          <div className="columnas">
            <div className="columna">
              <div>Fundacion X</div>
              <div>Fundacion X</div>
            </div>

            <div className="columna">
              <div>Fundacion X</div>
              <div>Fundacion X</div>
            </div>

            <div className="columna">
              <div>Fundacion X</div>
              <div>Fundacion X</div>
            </div>

            <div className="columna">
              <div>Fundacion X</div>
              <div>Fundacion X</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
