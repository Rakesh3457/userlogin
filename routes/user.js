const express = require('express')
const router = express.Router();

const userController = require('../controllers/user');

router.post('/checkUser', userController.checkUser);
router.post('/signup', userController.createNewUser);
router.post('/login', userController.authenicateUser);

module.exports = router;