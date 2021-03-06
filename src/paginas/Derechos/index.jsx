import React, { Component } from 'react';
import './estilos.css';
import ley from 'archivos/ley.pdf';

class Derechos extends Component {
  render() {
    return (
      <div className="Derechos">
        <div className="contenido">
          <h1>¿Por qué los derechos de las personas mayores?</h1>

          <div className="texto">
            La Organización Mundial de la Salud sostiene que: <b>“entre el 2000 y el 2050, la proporción de la población mundial con más de 60 años de edad se duplicará, ya que pasará de aproximadamente el 11% al 22%. Se espera que el número de personas de 60 años o más aumente de 605 millones a 2000 millones en ese mismo periodo.”</b>
            <br/><br/>
            Pero el escenario está cambiando no sólo por el incremento en la expectativa de vida, sino también porque asistimos cada vez más a un proceso de “envejecimiento activo”, cada vez son más quienes se dedican a la cultura, las relaciones sociales, la actividad física, la salud, el estudio, los viajes, etc. Es decir, aumenta el número de personas mayores, pero también cambian sus necesidades. Esto acarrea grandes beneficios y a su vez presenta nuevos desafíos; es necesario que se promuevan políticas que recepten los nuevos intereses de este sector de la sociedad, que se mejoren y amplíen los servicios destinados a ellos, siempre desde un enfoque de derechos humanos. Es necesario revalorizar la vejez, y adoptar las medidas que permitan vivirla plenamente.
          </div>

          <h1>Conoce estos derechos</h1>
          <div className="texto">
            La <b>Convención Interamericana sobre la Protección de los Derechos Humanos de las Personas Mayores</b> define a la persona mayor como aquélla de 60 años o más. En el texto del documento, se consagran los derechos de estas personas y se busca promover un envejecimiento activo.
            <br/><br/>
            Esta convención tiene como objetivo "promover, proteger y asegurar el reconocimiento y el pleno goce y ejercicio, en condiciones de igualdad, de todos los derechos humanos y libertades fundamentales de la persona mayor, a fin de contribuir a su plena inclusión, integración y participación en la sociedad".
            <br/><br/>
            A tales efectos, los estados partes se comprometen a adoptar las medidas que tiendan al cumplimiento de los derechos humanos y libertades fundamentales de las personas mayores.
            <br/><br/>
            Dentro de los derechos protegidos se encuentran:
          </div>

          <ul>
            <li>A la igualdad y la no discriminación por razones de edad</li>
            <li>A la vida y la dignidad en la vejez, a la independencia y la autonomía, a la participación y la integración comunitaria;</li>
            <li>A la seguridad y a una vida sin violencia, el derecho a no ser sometido a tortura ni a penas o tratos crueles, inhumanos o degradantes;</li>
            <li>A brindar consentimiento libre e informado en el ámbito de la salud, a la libertad personal y a la libertad de expresión;</li>
            <li>A la nacionalidad y a la libertad de circulación, el derecho a la privacidad y a la intimidad, el derecho a la seguridad social, el derecho al trabajo, a la salud, a la educación, a la cultura y a la recreación, a la propiedad y a la vivienda.</li>
          </ul>

          <a className="boton" href={ley} target="blank">Leer convención completa</a>
        </div>
      </div>
    );
  }
}

export default Derechos;
