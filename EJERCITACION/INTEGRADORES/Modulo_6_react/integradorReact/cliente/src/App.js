import React, { Component } from 'react';
import './css/App.css';
import Header from './componentes/header'
import Ficha from './componentes/ficha'
import Skills from './componentes/skills'
import Educacion from './componentes/educacion'
import Github from './componentes/github'
class App extends Component {

  render() {
    let containerStyle = {
    width:"60%",
    margin:"0 auto",
    border:"1px solid black"
    }
    return (
      <div style={containerStyle} className="container">
        <Header />
        <Ficha />
        <Skills/>
        <Educacion/>
        <Github/>
      </div>
    );
  }
}

export default App;
