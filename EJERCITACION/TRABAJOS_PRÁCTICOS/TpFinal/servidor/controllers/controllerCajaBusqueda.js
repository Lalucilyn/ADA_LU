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

self.apiProducto = async function(req,res,next){
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var pathname = urlParseada.pathname;
  var id = pathname.replace("/items/", "");

  axios.all([service.obtenerDescripcion(id), service.obtenerItem(id)])
  .then(axios.spread(async function (descripcion, producto) {
    //console.log(descripcion)
    //console.log(producto)
    var decimalesTodos = producto.data.price - Math.floor(producto.data.price);
    var decimales = decimalesTodos.toFixed(2)  
    miProducto = {
      author:{
        name:"Lucía",
        lastname:"Wainfeld"
      },
      item:{
        id:producto.data.id,
        title:producto.data.title,
        price:{
          currency:producto.data.currency_id,
          price:Math.floor(producto.data.price),
          decimals:decimales
        },
        picture:producto.data.pictures[0].url,
        condition:producto.data.condition,
        free_shipping:producto.data.shipping.free_shipping,
        sold_quantity:producto.data.sold_quantity,
        description:descripcion.data.plain_text
      }
  }
  var categoria = producto.data.category_id;
  const arrayCategories = await service.obtenerCategoria(producto.data.category_id)
  miProducto.categories = arrayCategories
  console.log("Controller: " + arrayCategories)
  


  return miProducto

}))
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

 

module.exports = self;

/*

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
       .then(function(data){
    var datosParaEnviar = JSON.stringify(data)
    res.send(data)
  })
  .catch(function (error) {
    console.log(error);
  })
}


*/