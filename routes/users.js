var express = require('express');
var router = express.Router();
var verifyToken = require('../authentication/verifyToken');
var userServices = require('../services/userServices');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register a new user
router.post('/register', userServices.userRegistration);

// login existing user
router.post('/login', userServices.userLogin);

// search an user using the specific fields
router.get('/search', verifyToken, userServices.dataSearch);

// get the sorted data of an user. Sorting on specific fields
router.get('/sort', verifyToken, userServices.sortUserData);

// get the user data in paginated form
router.get('/paginatedusers', verifyToken, userServices.pagination);

  
module.exports = router;