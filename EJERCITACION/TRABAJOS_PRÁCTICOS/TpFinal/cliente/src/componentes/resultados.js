import React, { Component } from 'react';
import Busqueda from './cajaBusqueda'
class Resultados extends Component {

  constructor(){
    super();
    this.state = {
    data:{}
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
  
  condicional(items) {
    if(items){
      return items.map(function(name, index){return <article className="producto"><img src={name.picture}/><div className="nombrePrecio"><h2>${name.price.amount}</h2><h3>{name.title}</h3></div><h4>{name.location}</h4></article>})
    }else{
      return console.log("nope")
    }
  }

 
  render() {
    var datos = this.state.data
    var arrayDatos = datos.items
      return (
      <div>
        <Busqueda/>
        <div id="cajaContenido">
        {this.condicional(arrayDatos)}
        </div> 
     </div>

    )
  }
}

export default Resultados;