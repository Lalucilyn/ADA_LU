import React, { Component } from 'react';
import '../css/fichaStyle.css';

class Ficha extends Component {

  render() {
   let datos = {
    edad:"34 años",
    mail:"Luwainfeld@gmail.com",
    tel:"4822-9662",    
   }
   return (
   <section id="ficha">
    <figure>
      <img src="/probanding.jpg"/>
    </figure>
    <article>
      <ul>
        <li><i className="fas fa-heart"></i>Edad: {datos.edad}</li>
        <li><i className="fas fa-heart"></i>Mail: {datos.mail}</li>
       <li><i className="fas fa-heart"></i>Teléfono: {datos.tel}</li>
      </ul>
    </article>
  </section>)
}
}

export default Ficha;