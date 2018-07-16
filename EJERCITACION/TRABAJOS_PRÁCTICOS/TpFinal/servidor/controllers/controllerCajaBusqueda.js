var axios = require('axios')
const JSON = require('circular-json');
var url = require('url');
const querystring = require('querystring')
const service = require('../services/serviceBusqueda')
const self = {};

self.apiBusqueda = function(req,res,next){
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var query = (querystring.parse(urlParseada.query)).query;

  if(query===undefined||!query) {
    var respuesta = {
                      respuesta:"esperando",
                      detalle:"Conexión establecida, pero no se ha ingresado búsqueda"
                    }
    res.send(JSON.stringify(respuesta))
  }else{
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=/'+query+'&limit=4')
    .then(function (response) {
      return {
              author:{
              name:"Lucía", 
              lastname:"Wainfeld"
             }, 
             categories:service.categorizar(response),
             items:service.obtenerItems(response)
             }
    })
    .then(function(datos){
      var misDatos = datos;
      return JSON.stringify(misDatos)
    })
    .then(function(miJSON){
      res.send(miJSON)
    })
    .catch(function (error) {
      console.log(error);
    })
  };
}

self.apiProducto = function(req,res,next){
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var pathname = urlParseada.pathname;
  var id = pathname.replace("/items/", "");
  var descripcion = service.obtenerDescripcion(id);
  console.log("descripción"+descripcion)
  
  axios.get('https://api.mercadolibre.com/items/'+id)
  .then(function (response) {
    var decimales = Math.floor(response.data.price) - response.data.price;  
    miProducto = {
      author:{
        name:"Lucía",
        lastname:"Wainfeld"
      },
      item:{
        id:response.data.id,
        title:response.data.title,
        price:{
          currency:response.data.currency_id,
          price:Math.floor(response.data.price),
          decimals:decimales
        },
        picture:response.data.pictures[0].url,
        condition:response.data.condition,
        free_shipping:response.data.shipping.free_shipping,
        sold_quantity:response.data.sold_quantity,
        description:descripcion
      }
  }
  return miProducto

  })

  .then(function(data){
    var datosParaEnviar = JSON.stringify(data)
    res.send(data)
  })
  .catch(function (error) {
    console.log(error);
  })
}


module.exports = self;