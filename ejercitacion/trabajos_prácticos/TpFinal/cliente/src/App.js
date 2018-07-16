import React, { Component } from 'react';
import logo from './logo.svg';
import Busqueda from './componentes/cajaBusqueda'
import Resultados from './componentes/resultados'
import Producto from './componentes/producto'
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const App = () => (
  <Router>
     <div>
      <Route exact path="/" component={Busqueda}/>
      <Route exact path="/items" component={Resultados}/>
      <Route exact path="/items/:id" component={Producto}/>
      {/*<Route component={Busqueda}/>*/}
     </div>
  </Router>
)

export default App;
