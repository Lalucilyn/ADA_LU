import React, { Component } from 'react';
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

  mostrarBreadcrumb(items){
    if(items){
      return items.map(function(name,index){
        return <li>{name.name}</li>
      })
    }
  }

  mostrarProducto(item){
     if(item){
      return <div className="miProducto"><article><figure><img src={item.picture} alt="Imagen del producto"/></figure><div className="info"><h4>{this.traducir(item.condition)} - {item.sold_quantity} vendidos </h4><h3>{item.title}</h3><h4 className="precio"><span>${item.price.price}</span></h4><button>Comprar</button></div></article><div className="descripcion"><h2>Descripción del producto</h2><p>{item.description}</p></div></div>
    }else{
      return console.log("nope")
    }
  }
 
  render() {
      var dato = this.state.data.item
      var categorias = this.state.data.categories
      console.log(categorias)
      return (
      <div id="vistaProducto">
        <ul>
          {this.mostrarBreadcrumb(categorias)}
        </ul>
        <div>
          {this.mostrarProducto(dato)}
        </div>
     </div>

    )
  }
}

export default Producto;