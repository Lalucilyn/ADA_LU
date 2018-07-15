var axios = require('axios')
const JSON = require('circular-json');
var url = require('url');
const querystring = require('querystring')
const self = {};

self.apiBusqueda = function(req,res,next){
var urlEntera = req.headers.referer;
var urlParseada = url.parse(urlEntera); 
var query = (querystring.parse(urlParseada.query)).query;
console.log(query);

if(query===undefined||!query) {
  var respuesta = {
    respuesta:"esperando",
    detalle:"Conexión establecida, pero no se ha ingresado búsqueda"
  }
  res.send(JSON.stringify(respuesta))
}else{
axios.get('https://api.mercadolibre.com/sites/MLA/search?q=/'+query+'&limit=4')
  .then(function (response) {
    var items = []
    for(i=0;i<4;i++){
      var decimalesTodos  = response.data.results[i].price - Math.floor(response.data.results[i].price)
      var decimales = decimalesTodos.toFixed(2)
      var item = {
        id:response.data.results[i].id,
        title:response.data.results[i].title,
        price:{
          currency:response.data.results[i].installments.currency_id,
          amount:Math.floor(response.data.results[i].price),
          decimals:decimales 
        },
        picture:response.data.results[i].thumbnail,
        condition:response.data.results[i].condition,
        free_shipping:response.data.results[i].shipping.free_shipping,
        location:response.data.results[i].address.state_name
      }
      items.push(item)
    }
    
    //Chequeá si funciona mañana. No sé qué pasó
    function categorizar(){
    var filtroCategorias = response.data.filters[0]
    if(filtroCategorias === undefined){
      console.log("indefinido")
      var categorias="no hay categorías disponibles"
    }else{
      console.log("definido")
      var categorias=response.data.filters[0].values[0].path_from_root
    }
    return categorias
    }
    return {
      author:{
              name:"Lucía", 
              lastname:"Wainfeld"
      }, 
      categories:categorizar(),
      items:items
    }})

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
    }
  }
  return miProducto

  })
  .then(function (producto){
    function obtenerDescripcion(){
      axios.get('https://api.mercadolibre.com/items/'+id+'/description')
      .then(function(response){
         console.log(producto)
         var descripcion = response.data.plain_text
         producto.item.description = descripcion
         console.log(producto)
      })
    }
    obtenerDescripcion()
    return producto

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