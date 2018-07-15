import React, { Component } from 'react';
import '../css/header.css';

class Header extends Component {
  render() {
  let Nombre = "Lucía Wainfeld"
  let Title = "Editora"
  let redes = [
  {
    nombre:"Facebook",
    icono:"fab fa-facebook",
    link:"#"
  },
  {
    nombre:"Twitter",
    icono:"fab fa-twitter",
    link:"#"
  },
  {
    nombre:"Google+",
    icono:"fab fa-google-plus-g",
    link:"#"
  },
  {
    nombre:"Linkedin",
    icono:"fab fa-linkedin-in",
    link:"#"
  },
  {
    nombre:"Github",
    icono:"fab fa-github",
    link:"#"
  },
  {
    nombre:"Skype",
    icono:"fab fa-skype",
    link:"#"
  }];

  const unEstilo = {
    background:"#aa00c7",
    color:"white"
  }

  const iconoStyle = {
    width:"40px",
    height:"40px",
    borderRadius:"80%",
    border:"2px solid #8e24aa",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }

    return (
      <header style={unEstilo}>
        <div id="datosNombre">
        <div id="nombre">
          <h1>{Nombre}</h1>
          <h2>{Title}</h2>
        </div>
        <div id="redes">
          {redes.map(function(name, index){return <a key={name.nombre} href={name.link}><div style={iconoStyle} className="iconito"><i className={name.icono}></i></div></a>})}
        </div>
      </div>
      </header>
    );
  }
}

export default Header;
