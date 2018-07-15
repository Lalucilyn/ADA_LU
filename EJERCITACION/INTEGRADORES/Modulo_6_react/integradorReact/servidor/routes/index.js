var express = require('express');
var controlador = require('../controllers/controlador.js')
var router = express.Router();

/* GET home page. */
router.get('/', controlador.traerGithub)

module.exports = router;
