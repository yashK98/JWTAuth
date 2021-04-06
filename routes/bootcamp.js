const express = require('express');
const {getBootcamps, getBootcampWithId, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamp');
const router = express.Router();

router.route('/').get(getBootcamps);
router.route('/').post(createBootcamp);
router.route('/:id').get(getBootcampWithId);
router.route('/:id').put(updateBootcamp);
router.route('/:id').delete(deleteBootcamp);

module.exports = router;