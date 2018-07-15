import React, { Component } from 'react';
import '../css/skillsStyle.css';

class Skills extends Component {
  
  render() {
   var titleStyle = {
    color:"#6a1b9a",
    textAlign:"center",
    margin:"0",
    padding:"0"
  }

   return (
   <div id="skills">
   <h2 style={titleStyle}>Skills</h2>
   <section>
    <p>Tiramisu jelly-o soufflé cupcake cotton candy candy lemon drops. Chocolate lollipop brownie jelly beans. Pastry ice cream tootsie roll sweet ice cream lemon drops danish jelly-o marshmallow. Bear claw biscuit marzipan tiramisu bear claw marzipan. Jujubes lollipop topping caramels. Toffee cupcake dessert sweet roll ice cream cotton candy marzipan. Pie macaroon chocolate cake apple pie candy. Cupcake gingerbread jelly biscuit chupa chups powder topping jelly-o ice cream. Sweet jelly beans pastry oat cake. Candy canes cotton candy tiramisu lollipop jelly-o dessert jelly macaroon chocolate. Chocolate bar tart brownie sesame snaps powder chocolate soufflé. Apple pie cake soufflé.</p>
    <div id="skillBars">
      <p>HTML5</p>
      <div className="emptyBar"><div id="html5"></div></div>
      <p>CSS3</p>
      <div className="emptyBar"><div id="css3"></div></div>
      <p>Javascript</p>
      <div className="emptyBar"><div id="javascript"></div></div>
      <p>Node</p>
      <div className="emptyBar"><div id="node"></div></div>
    </div>
   </section>
   </div>)
}
}

export default Skills;