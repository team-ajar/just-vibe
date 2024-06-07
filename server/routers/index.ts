const express = require('express');
const searchController = require('./searchController');
const albumOfTheDayController = require('./albumOfTheDayController');
// const eventsController = require('./eventsController');
// const profileController = require('./profileController');
const reviewsController = require('./reviewsController');
const router = express.Router();

//searchController
router.route('/search/:search').get(searchController.handleSearch);

router.route('albums/:albumId/review').post(reviewsController.createReview);
router.route('albums/:albumId/review/:id').delete(reviewsController.deleteReview);
router.route('albums/:albumId/review/:id').put(reviewsController.updateReview);
// albumOfTheDayController  
router.route('/album-of-the-day').post(albumOfTheDayController.setAlbumOfTheDay);

module.exports = router;
