const service = {}
var axios = require('axios')

service.categorizar = function(response){
    var filtroCategorias = response.data.filters[0]
    if(filtroCategorias === undefined){
      console.log("indefinido")
      var categorias=[{name:"no hay categorías disponibles"}]
    }else{
      console.log("definido")
      var categorias=response.data.filters[0].values[0].path_from_root
    }
    return categorias
}

service.obtenerItems = function(response){
	    var items = []
    for(i=0;i<4;i++){
      console.log(response.data.results[i].price)
      var decimalesTodos  = response.data.results[i].price - Math.floor(response.data.results[i].price)
      var decimales = decimalesTodos.toFixed(2)
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

service.obtenerDescripcion = function(producto){
      return axios.get('https://api.mercadolibre.com/items/'+producto+'/description')

}

service.obtenerItem = function(producto){
	return axios.get('https://api.mercadolibre.com/items/'+producto)
}

service.obtenerCategoria = function(categoria){
	return axios.get("https://api.mercadolibre.com/categories/"+categoria)
  
  .then(function (response) {
    var categorias = response.data.path_from_root;
    console.log(categorias)
    return categorias
  })
  .catch(function (error) {
    console.log(error);
  });
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