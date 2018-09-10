import React, { Component } from 'react';
import hero from './hero-final.png';
import './estilos.css';

class Inicio extends Component {
  render() {
    return (
      <div className="Inicio">
        <div className="imagenGrande">
          <img src={hero} alt="Foto de inicio" />
          <div className="lema">
            Una plataforma para visibilizar, promover y cumplir los derechos de las personas mayores
          </div>
        </div>

        <div className="contenido">
          <h1>¿Qué es “Vejez Activa”?</h1>
          <div className="texto">
            Es una iniciativa que surge de la necesidad de promover el cumplimiento los derechos humanos de las personas mayores. Argentina, junto con otros Estados de la región, ha firmado la Convención Interamericana sobre la Protección de los Derechos Humanos de las Personas Mayores, que los obliga a adoptar medidas para garantizar los derechos de las personas mayores de 60 años.
          </div>

          <br/>

          <h1>¿Qué hacemos?</h1>
          <div className="texto">
            Nos interesa visibilizar y sensibilizar sobre la vejez como una etapa de la vida, con sus particularidades. Por ello, difundimos la convención y el paradigma de envejecimiento activo que ésta propone, para que la comunidad y las personas sujetas de derecho sean concientizadas sobre los derechos humanos los/as adultos/a mayores. Además, sabiendo que muchas familias optan por las instituciones geriátricas como residencia para las personas mayores, es importante que se haga en instituciones habilitadas de acuerdo a las normativas provinciales y municipales. Por ello, brindamos una herramienta que permita visualizar los geriátricos habilitados de la ciudad de Córdoba y la información correspondiente a cada institución.
          </div>

        </div>

        <div className="contenido links">
          <h1>Links de interés</h1>
          <div className="columnas">
            <div className="columna">
              <ul>
                <li><a href="http://entramado.fundeps.org/2017/06/15/viejos-son-los-trapos/" target="_blank" rel="noopener noreferrer">Viejos son los trapos</a></li>
                <li><a href="http://www.fundeps.org/avances-en-el-proyecto-de-ley-de-proteccion-integral-de-las-personas-mayores/" target="_blank" rel="noopener noreferrer">Proy. de Ley de Proteccion Integral</a></li>
                <li><a href="http://www.fundeps.org/la-oea-aprobo-la-convencion-que-protege-los-derechos-de-las-personas-mayores/" target="_blank" rel="noopener noreferrer">OEA: Convención de Protección a Personas Mayores</a></li>
                <li><a href="http://www.cba.gov.ar/r-u-ge-pre-sa-registro-de-unidades-de-gestion-de-prestaciones-de-salud/" target="_blank" rel="noopener noreferrer">RUGEPRESA</a></li>
              </ul>
            </div>

            <div className="columna">
              <ul>
                <li><a href="http://www.oas.org/es/sla/ddi/tratados_multilaterales_interamericanos_a-70_derechos_humanos_personas_mayores.asp" target="_blank" rel="noopener noreferrer">Tratados Multilaterales Interamericanos</a></li>
                <li><a href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/195000-199999/197859/norma.htm" target="_blank" rel="noopener noreferrer">Ley Nacional: Muerte Digna</a></li>
                <li><a href="http://web2.cba.gov.ar/web/leyes.nsf/0/A1CD81DA48CC32FE0325723400641BF1?OpenDocument&Highlight=0,7872" target="_blank" rel="noopener noreferrer">Ley Provincial de Geriatricos</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
