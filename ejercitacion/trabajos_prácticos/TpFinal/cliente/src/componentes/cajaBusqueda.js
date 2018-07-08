import React, { Component } from 'react';
import '../css/cajaBusquedaStyle.css';
class Busqueda extends Component {

 constructor(){
  super();
  this.state = {
    data:[]
  }
  }

  componentDidMount() {
    fetch("/items")
     .then((response) => {
      return response.json()
     })
     .then((recurso) => {
     this.setState({ data: recurso })
      console.log(this.state)
     })
  }

 
  render() {
    var datos = this.state.data
    var arrayDatos = datos.resultados
    arrayDatos?console.log(arrayDatos[1]):console.log("esperá")
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
      <input name="query" type="text" placeholder=" Nunca dejes de buscar"/>
      <button type="submit" style={miButton}></button>
     </form>  
      {arrayDatos ? <div><h1>{arrayDatos[1].title}</h1><h2>{arrayDatos[1].address.state_name}</h2><h2>{arrayDatos[1].price}</h2><img src={arrayDatos[1].thumbnail}/></div>: <h1>Nope</h1>}
     </div> 
    )
  }
}

export default Busqueda;