import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Inicio from 'paginas/Inicio';
import Buscador from 'paginas/Buscador';
import Derechos from 'paginas/Derechos';
import Cabecera from 'componentes/Cabecera';
import Pie from 'componentes/Pie';
import './estilos/base.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>

            <Route path='/:paginaActual?' component={ Cabecera } />

            <Switch>
              <Route path='/buscador-de-geriatricos' component={ Buscador } />
              <Route path='/derechos-de-los-mayores' component={ Derechos } />
              <Route path='/' component={ Inicio } />
            </Switch>

            <Pie></Pie>

          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
