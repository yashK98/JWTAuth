const express = require('express');
const User = require('../controllers/user');
const router = express.Router();
const {protect} = require('../middleware/auth');

router.route('/addUser').post(User.addUsers);
router.route('/signIn').post(User.signInUser);
router.route('/getUser').get(protect,User.getUsers);
router.route('/getUser/:name').get(protect,User.getUserByName);

module.exports = router;