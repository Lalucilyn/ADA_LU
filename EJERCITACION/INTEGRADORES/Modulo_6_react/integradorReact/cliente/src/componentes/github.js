import React, { Component } from 'react';
import '../css/educacionStyle.css';

class Github extends Component {
  constructor(){
  super();
  this.state = {
    data:[]
  }
  }
  componentDidMount() {
    fetch("https://api.github.com/users/lalucilyn/repos")
     .then((response) => {
      return response.json()
    })
    .then((recurso) => {
      this.setState({ data: recurso })
      console.log(this.state)
    })
  }

  render() {
    const data = this.state.data
    console.log(data)
   var titleStyle = {
    color:"#6a1b9a",
    textAlign:"center",
    margin:"0",
    padding:"0"
  }


   return (
   <div id="github">
   <h2 style={titleStyle}>Github</h2>
   <p>Pastry chocolate bar danish chupa chups tart jelly-o tiramisu marzipan chupa chups. Sugar plum cotton candy jelly-o marzipan pie. Bonbon apple pie jelly beans. Halvah cake brownie liquorice pudding marshmallow caramels danish. Caramels chupa chups soufflé chupa chups caramels candy canes. Danish lemon drops candy cheesecake cake. Dessert chupa chups brownie cake sweet roll apple pie. Dragée chupa chups tootsie roll tootsie roll. Ice cream cheesecake jelly candy canes. Marzipan macaroon halvah muffin jelly-o wafer sweet roll. Sesame snaps cake jelly beans cupcake croissant croissant. Dragée biscuit oat cake.</p>
   <section>
   
   {data.map(function(value, index){
                    if(index%2===0){
                    return <div key={ index } className="repos par">
                    <h3>{value.name}</h3>
                    <a href={value.html_url} className="repoLink">ver repositorio</a>
                    </div>;
                  }else{
                    return <div key={ index } className="repos impar">
                    <h3>{value.name}</h3>
                    <a href={value.html_url} className="repoLink">ver repositorio</a>
                    </div>
                  }
                  })}
   </section>
   </div>
)
}
}
export default Github;