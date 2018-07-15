import React, { Component } from 'react';
import '../css/educacionStyle.css';

class Educacion extends Component {

  render() {
  var titleStyle = {
    color:"#6a1b9a",
    textAlign:"center",
    margin:"0",
    padding:"0"
  }

  var data = [
  {
    titulo:"Universidad de Buenos Aires",
    detalle:"Título: Editora. Año de graduación:2017.",
  },
  {
    titulo:"ADA Coding Bootcamp",
    detalle:"Título: Front End Developer. En curso."
  }]

   return (
   <div id="educacion">
    <h2 style={titleStyle}>Educacion</h2>
    <section> 
     {data.map(function(value, index){
                    return <div className="plum" key={ index }><h3>{value.titulo}</h3><p>{value.detalle}</p></div>;
                  })}
    </section>
   </div>
)
}
}
export default Educacion;
