import React, { Component } from 'react';
import '../css/resultadosStyle.css';
class Resultados extends Component {

  constructor(){
    super();
    this.state = {
    data:{},
    error:false,
    textoError:""
    }
  }

  componentDidMount() {
    var that = this; 
    fetch("/items")
     .then((response) => {
      return response.json()
     })
     .then((recurso) => {
     if(recurso.error){
      console.log(recurso.error)
      this.setState({error:true})
      this.setState({textoError:recurso.error})
      console.log(this.state)
     }else{ 
     console.log(recurso.items)
     this.setState({ data: recurso })
     console.log(this.state)
     }
     })
     .catch(function(error){
      that.setState({error:true});
      that.setState({textoError:"No se pudo establecer la conexión con el servidor"})
     })
  }
  
  render() {
    var datos = this.state.data
    var arrayDatos = datos.items
    var arrayCategorias = datos.categories
    var estiloError = {
      "textAlign":"center",
      "fontSize":"24px",
      "color":"#00695c",
      "width":"83%",
      "margin":"0 auto",
      "marginTop":"32px",
    }

    return (
      <div>
        {this.state.error && <h1 style={estiloError}>{this.state.textoError}</h1>}
        <div id="cajaContenido">
          <ul>
            {arrayCategorias && arrayCategorias.map(function(name,index){return <li key={name.name}>{name.name}</li>})}
          </ul>
          <div>
            {arrayDatos && arrayDatos.map(function(name, index){
              var itemUrl = "/items/"+name.id
              return <a key={itemUrl} href={itemUrl}><article className="producto"><figure><img src={name.picture} alt="Thumbnail del producto"/></figure><div className="nombrePrecio"><div><h2 className="precio"><span>{name.price.currency==="USD"?"US$ ":"$ "}{name.price.amount}</span>{name.price.decimals!="00" && <span className="decimales">{name.price.decimals}</span>}{name.free_shipping && <i className="fas fa-truck"></i>}</h2></div><h3>{name.title}</h3></div><h4>{name.location}</h4></article></a>})
            }
          </div>
        </div> 
     </div>
    )
  }
}

export default Resultados;

