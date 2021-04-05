const express = require('express');
const {getBootcamps, getBootcampWithId, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamp');
const router = express.Router();

router.route('/').get(getBootcamps);
router.route('/').post(createBootcamp);
router.route('/:name').get(getBootcampWithId);
router.route('/:name').put(updateBootcamp);
router.route('/:name').delete(deleteBootcamp);

module.exports = router;