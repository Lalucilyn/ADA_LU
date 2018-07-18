import React, { Component } from 'react';
import '../css/cajaBusquedaStyle.css';
class Busqueda extends Component {

  constructor(){
    super();
    this.state = {
    }
  }
  
  render() {
    return (
     <div> 
     <form type="get" id="cajaBusqueda" action="/items">
      <div id="miLogo">
        <a href="/"><img src="/images/logo.png" alt="logo"/></a> 
        <span>Uni-Commerce</span>
      </div>
      <div className="buscador">
      <input name="search" type="text" placeholder=" Ingresá tu criterio de búsqueda" required/>
      <button id="miBoton" type="submit"></button>
      </div>
     </form>  
     </div>
    )
  }
}

export default Busqueda;