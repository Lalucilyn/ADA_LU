import React, { Component } from 'react';
import Busqueda from './cajaBusqueda';
import '../css/productoStyle.css';
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
      return response.json()
     })
     .then((recurso) => {
     console.log(recurso)
     this.setState({ data: recurso })
     console.log(this.state.data)
     })
  }

  traducir(condicion){
    var traduccion;
    condicion==="new"?traduccion="Nuevo":traduccion="Usado"
    return traduccion
  }

  mostrarProducto(item){
     if(item){
      return <div className="miProducto"><article><figure><img src={item.picture} alt="Imagen del producto"/></figure><div className="info"><h4>{this.traducir(item.condition)} - {item.sold_quantity} vendidos </h4><h3>{item.title}</h3><h4 className="precio">${item.price.price}.<span>{item.price.decimals}</span></h4><button>Comprar</button></div></article><div className="descripcion"><h2>Descripción del producto</h2><p>Estoy teniendo algunos problemas para traerme la descripción del producto. Cuando lo logre, va a estar acá.</p></div></div>
    }else{
      return console.log("nope")
    }
  }
 
  render() {
      var dato = this.state.data.item
      console.log(dato)
      return (
      <div>
        <Busqueda/>
        <main>
        {this.mostrarProducto(dato)}
        </main>
     </div>

    )
  }
}

export default Producto;