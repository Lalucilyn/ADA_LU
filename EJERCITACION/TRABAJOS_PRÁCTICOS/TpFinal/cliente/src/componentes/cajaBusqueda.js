import React, { Component } from 'react';
import '../css/cajaBusquedaStyle.css';
class Busqueda extends Component {

  constructor(){
    super();
    this.state = {
    }
  }

   render() {
  
    var miButton = {
      width:"4.167%",
      height:"28px",
      backgroundImage:"url('/images/lupa.png.png')",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center",
      backgroundSize:"18px auto",
      backgroundColor:"#EEEEEE",
      border:"none",
      borderRadius: "0px 5px 5px 0px"
    }

    var miLogo = {
      height:"28px",
      width:"auto",
      marginLeft:"12.506%"
    }
    return (
     <div> 
     <form type="get" id="cajaBusqueda" action="/items">
      <img style={miLogo} src="/images/logo.png"/> 
      <input name="query" type="text" placeholder=" Ingresá tu criterio de búsqueda"/>
      <button type="submit" style={miButton}></button>
     </form>  
     </div>
    )
  }
}

export default Busqueda;