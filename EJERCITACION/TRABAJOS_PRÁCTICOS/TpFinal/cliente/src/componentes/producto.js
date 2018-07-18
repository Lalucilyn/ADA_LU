import React, { Component } from 'react';
import '../css/productoStyle.css';
class Producto extends Component {

  constructor(){
    super();
    this.state = {
    data:{},
    error:false,
    textError:""
    }
  }

  componentDidMount() {
    var that = this
    fetch("/items/item")
      .then((response) => {
        return response.json()
      })
      .then((recurso) => {
        if(recurso.error){
          console.log(recurso.error);
          this.setState({error:true})
          this.setState({textoError:recurso.error})
          console.log(this.state)
        }else{ 
          console.log(recurso)
          this.setState({ data: recurso })
          console.log(this.state.data)
        }
      })
      .catch(function(error){
        that.setState({error:true});
        that.setState({textoError:"No se pudo establecer la conexión con el servidor"})
      })
  }

  traducir(condicion){
    var traduccion;
    condicion==="new"?traduccion="Nuevo":traduccion="Usado"
    return traduccion
  }

  elegirMoneda(currency){
    console.log(currency)
    var simbolo;
    currency==="USD"?simbolo="US$ ":simbolo="$ ";
    return simbolo
  }

  render() {
      var item = this.state.data.item
      var categorias = this.state.data.categories
      var estiloError = {
        "textAlign":"center",
        "fontSize":"24px",
        "color":"#00695c",
        "width":"83%",
        "margin":"0 auto",
        "marginTop":"32px",
      }

      return (
      <div id="vistaProducto">
        {this.state.error && <h1 style={estiloError}>{this.state.textoError}</h1>}
        <ul>
          {categorias && categorias.map(function(name,index){return <li key={name.name}>{name.name}</li>})}
        </ul>
        <div>
          {item && <div className="miProducto"><article><figure><img src={item.picture} alt="Imagen del producto"/></figure><div className="info"><h5>{this.traducir(item.condition)} - {item.sold_quantity} vendidos </h5><h3>{item.title}</h3><h5 className="price"><span>{this.elegirMoneda(item.price.currency)}{item.price.price}</span>{item.price.decimals!="00" && <span className="decimales">{item.price.decimals}</span>}</h5><button>Comprar</button></div></article><div className="descripcion"><h2>Descripción del producto</h2><p>{item.description}</p></div></div>}
        </div>
     </div>
    )
  }
}

export default Producto;