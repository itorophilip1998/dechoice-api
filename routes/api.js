const express = require('express');
const { signin, signup, signout, me } = require('../controllers/UserController');
const { authenticateToken } = require('../middleware/auth');
const route = express.Router() 


route // Auth Group
.post('/signup',signup)
.post('/signin' ,signin)
.delete('/signout',authenticateToken,signout)
.get('/me',authenticateToken,me);

module.exports=route;

