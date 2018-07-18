const service = {}
var axios = require('axios')

//Retorna el array de categorías para hacer el breadcrumb
service.categorizar = function(query,response){
  var filtroCategorias = response.data.filters[0]
  //Resuelvo los casos en el que filters viene vacío. Cuando pasa, mando el nombre de la query
  if(filtroCategorias === undefined){
    var categorias=[{name:query}]
  //En los otros casos, mando el array completo de categorías
  }else{
    var categorias=response.data.filters[0].values[0].path_from_root
  }
  return categorias
}

//Retorna el array con los cuatro ítems que va a mostrar el resultado de búsqueda
service.obtenerItems = function(response){
	var items = []
  for(i=0;i<4;i++){
    var decimalesTodos  = response.data.results[i].price - Math.floor(response.data.results[i].price)
    var decimales = decimalesTodos.toFixed(2).toString().replace("0.","")
    //Crea el objeto de cada item con el formato solicitado
    var item = {
          id:response.data.results[i].id,
          title:response.data.results[i].title,
          price:{
            currency:response.data.results[i].currency_id,
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
  return items
}

//Retorna la descripción de un producto individual
service.obtenerDescripcion = function(producto){
  return axios.get('https://api.mercadolibre.com/items/'+producto+'/description')
}

//Retorna los datos de un producto individual
service.obtenerItem = function(producto){
	return axios.get('https://api.mercadolibre.com/items/'+producto)
}

//Le pega a la API de categorías para obtener el array para el breadcrumb de producto individual
service.obtenerCategoria = function(categoria){
	return axios.get("https://api.mercadolibre.com/categories/"+categoria)
              .then(function (response) {
                var categorias = response.data.path_from_root;
                console.log(categorias)
                return categorias
              })
              .catch(function (error) { //PENDIENTE. ENVIAR ALGO
                console.log(error);
              });
}

//Me devuelve el texto de la descripción o, si no la hay, un string de aviso.
service.traerDescripcion = function(descripcion){
  if(descripcion==="" || !descripcion){
    return "No hay descripción disponible"
  }else{
    return descripcion
  }
}

module.exports = service;

/*

service.obtenerDescripcion = function(producto){
      axios.get('https://api.mercadolibre.com/items/'+producto+'/description')
      .then(function(response){
         return response
      })
      .then(function(data){
      	console.log(data.data.plain_text)
      	return data.data.plain_text
      })

      .catch(function(error){
      	return error
      })
     
  }


*/