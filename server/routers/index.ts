const express = require('express');
const searchController = require('./searchController');
// const eventsController = require('./eventsController');
// const profileController = require('./profileController');
const reviewsController = require('./reviewsController');
const router = express.Router();

router.route('/search/:search').get(searchController.handleSearch);

router.route('albums/:albumId/review').post(searchController.createReview)
router.route('albums/:albumId/review').delete(searchController.deleteReview)
module.exports = router;
