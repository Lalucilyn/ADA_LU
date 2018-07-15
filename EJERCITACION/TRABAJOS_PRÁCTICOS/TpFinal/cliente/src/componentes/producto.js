import React, { Component } from 'react';
import Busqueda from './cajaBusqueda'
class Producto extends Component {

  constructor(){
    super();
    this.state = {
    data:{}
    }
  }

  componentDidMount() {
    fetch("/items/item")
     .then((response) => {
      return response
     })
     .then((recurso) => {
     this.setState({ data: recurso })
     console.log(this.state)
     })
  }
 
  render() {
      return (
      <div>
        <Busqueda/>
        <h1>Soy un componente nuevo</h1>
     </div>

    )
  }
}

export default Producto;