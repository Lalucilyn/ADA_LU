import React, { Component } from 'react';
import '../css/resultadosStyle.css';
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
  
  crearItems(items) {
    if(items){
      return items.map(function(name, index){
      var itemUrl = "/items/"+name.id
      return <a href={itemUrl}><article className="producto"><figure><img src={name.picture}/></figure><div className="nombrePrecio"><h2>${name.price.amount}</h2><h3>{name.title}</h3></div><h4>{name.location}</h4></article></a>})
    }else{
      return console.log("nope")
    }
  }
  
  crearBreadcrumb(datos){
    if(datos){
      return datos.map(function(name,index){
        return <li>{name.name}</li>
      })
    }
  }
 
  render() {
    var datos = this.state.data
    var arrayDatos = datos.items
    var arrayCategorias = datos.categories
    console.log(arrayCategorias)
      return (
      <div>
        <div id="cajaContenido">
          <ul>
            {this.crearBreadcrumb(arrayCategorias)}
          </ul>
          <p>
            {this.crearItems(arrayDatos)}
          </p>
        </div> 
     </div>
    )
  }
}

export default Resultados;