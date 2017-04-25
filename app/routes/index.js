//Importing modules
var express = require('express');
var router = express.Router();

//Importing controllers
var indexController = require('../controllers/indexController');

//Routes
router.get('/', indexController.index);
router.get('/new/:url(*)', indexController.newUrl);
router.get('/:url', indexController.redirectToUrl);

module.exports = router;
