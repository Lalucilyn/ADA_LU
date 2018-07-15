var self = {};
var axios = require('axios')
 self.traerGithub = function(req,res,next){
 axios
  .get('https://api.github.com/users/lalucilyn/repos')
  .then(function (response) {
      return response
  })
  .catch(function (error) {
      res.send('ups')
  });
}

module.exports = self;