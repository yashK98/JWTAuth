const express = require('express');
const User = require('../controllers/user');
const router = express.Router();

router.route('/addUser').post(User.addUsers);
router.route('/getUser').get(User.getUsers);
router.route('/getUser/:name').get(User.getUserById);

module.exports = router;