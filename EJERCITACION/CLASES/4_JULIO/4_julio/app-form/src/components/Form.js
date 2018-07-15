import React, { Component } from 'react';

class Form extends Component {

  constructor (props) {
    super(props);
      this.state = {
        email: '',
        password: '',
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
      }
    }
    
  handleUserInput (e) {
    console.log(this.state)
      //Cada vez que sucede el evento onChange, me trae el nombre del input en el que escribí...
      const name = e.target.name;
      //...y el valor
      const value = e.target.value;
      //Completa los dos campos en el state con los datos que juntó (en name, primero va a ir mail y el mail que ingrese // y después, el password y el valor que ingrese)
      this.setState({[name]: value},() => { this.validateField(name, value) });
  }  

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors; //Toma el valor de state y se va a modificar según lo que pase en las líneas 35 y 40
    let emailValid = this.state.emailValid; //Va a traer un booleano que se define en la línea 34
    let passwordValid = this.state.passwordValid; //ídem línea 38

    switch(fieldName) {
      case 'email': //Entra por acá si el nombre del input afectado es 'email'
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); //Chequea el mail con una REGEX. Devuelve true or false
        fieldValidationErrors.email = emailValid ? '' : ' Email invalido'; //Si emailValid es true, el error queda vacío. Si es false, se setea en "Email inválido"
        break;
      case 'password': //Idem primer caso, pero con password.
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' Demasiado corta'; //da valor a passwordValid dentro de errors según la variable anterior sea true or false
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors, //Setea los valores en state, según como queden las variables en líneas 28, 29 y 30
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, 
                  this.validateForm //Llama la función de la línea 52
                  );
  }

  validateForm() {
    
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    //Setea el valor de formValid como true si emailValid y passwordValid lo son
  }


  render() {

    return (
      <div className="Alta">
        <div className="errorPanel">
            <ul>
                {/*Creo un li que va a traer los mensajes de error si los hay, si no, viene vacío*/}
                <li>{this.state.formErrors.email}</li>
                <li>{this.state.formErrors.password}</li>               
            </ul>
        </div>

        <form>
          <label>Email:</label>
           {/*Le va asignando al input el value que le ingreso. No sirve para mucho en este caso. Tiene asociado un evento on Change que llama a la función de la línea 16 en la cual seteo el state.mail y state.password según lo que voy escribiendo*/}
          <input type="text" name="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)}/>
          <label>Password:</label>
          <input type="text" name="password" value={this.state.pass} onChange={(event) => this.handleUserInput(event)}/>
          
          {/*El botón está desactivado si state.formValid es falso. Lo cual significa que solamente lo puedo clickear si mail y pass son válidos*/}
          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Ingresar</button>
        </form>

      </div>
    );
  }

}

export default Form;
