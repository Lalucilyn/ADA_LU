var axios = require('axios')
const JSON = require('circular-json');
var url = require('url');
const querystring = require('querystring')
const service = require('../services/serviceBusqueda')
const self = {};

//Devuelve los resultados de búsqueda
self.apiBusqueda = function(req,res,next){
  //Obtengo el query
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var query = (querystring.parse(urlParseada.query)).search;

  //Si me llega un query inválido, envío una respuesta
  if(query===undefined||!query) {
    var respuesta = {
                    error:"¡Parece que la página que estás buscando no existe!"
                    }
    res.send(JSON.stringify(respuesta))
  }
  //Si me llega un query válido, lo proceso para enviar los resultados
  else{
    //Llamo a la API de search
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=/'+query+'&limit=4')
    .then(function (response) {
      //Creo el objeto con el formato solicitado
      return {
             author:{
             name:"Lucía", 
             lastname:"Wainfeld"
             }, 
             categories:service.categorizar(query,response),
             items:service.obtenerItems(response)
             }
      })

    .then(function(datos){
      var misDatos = datos;
      res.send(JSON.stringify(misDatos))
    })

    .catch(function (error) {
      var miError = {error:"¡Parece que tu búsqueda no ha arrojado resultados!"}
      res.send(JSON.stringify(miError))
    })
  };
}

//Devuelve cada producto individualmente
self.apiProducto = async function(req,res,next){
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var pathname = urlParseada.pathname;
  var id = pathname.replace("/items/", "");

  axios.all([service.obtenerDescripcion(id), service.obtenerItem(id)])
  .then(axios.spread(async function (descripcion, producto) {
    var decimalesTodos = producto.data.price - Math.floor(producto.data.price);
    var decimales = decimalesTodos.toFixed(2).toString().replace("0.","");
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
        description:service.traerDescripcion(descripcion.data.plain_text)
      }
    }
    const arrayCategories = await service.obtenerCategoria(producto.data.category_id)
    miProducto.categories = arrayCategories
    return miProducto
  }))

  .then(function(datos){
    var misDatos = datos;
    var miJSON = JSON.stringify(misDatos)
    res.send(miJSON)
  })

  .catch(function (error) {
    var miError = {error:"¡Lo sentimos! No encontramos la información del producto!"}
    res.send(JSON.stringify(miError))
    })
};

 

module.exports = self;

