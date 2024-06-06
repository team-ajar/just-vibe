const express = require('express');
const searchController = require('./searchController');
const albumOfTheDayController = require('./albumOfTheDayController');
// const eventsController = require('./eventsController');
// const profileController = require('./profileController');
const reviewsController = require('./reviewsController');
const router = express.Router();

//searchController
router.route('/search/:search').get(searchController.handleSearch);

<<<<<<< HEAD
router.route('albums/:albumId/review').post(searchController.createReview)
router.route('albums/:albumId/review').delete(searchController.deleteReview)
=======
// albumOfTheDayController
router.route('/album-of-the-day').post(albumOfTheDayController.setAlbumOfTheDay);

>>>>>>> 6de52316b1778048093863a799080df0653a7745
module.exports = router;
