const express = require('express');
const searchController = require('./searchController');
const albumOfTheDayController = require('./albumOfTheDayController');
const musicController = require('./musicController');
const eventsController = require('./eventsController');
const profileController = require('./profileController');
const reviewsController = require('./reviewsController');
const router = express.Router();

//searchController
router.route('/search/:search').get(searchController.handleSearch);

router.route('/albums/:albumId/review/:userId').post(reviewsController.createReview);
router.route('/albums/:albumId/review/:id/:userId').delete(reviewsController.deleteReview);
router.route('/albums/:albumId/review/:id/:userId').put(reviewsController.updateReview);
// albumOfTheDayController  
// router.route('albums/:albumId/review').post(reviewsController.createReview);
// router.route('albums/:albumId/review/:id').delete(reviewsController.deleteReview);
// router.route('albums/:albumId/review/:id').put(reviewsController.updateReview);
// albumOfTheDayController
router.route('/album-of-the-day').post(albumOfTheDayController.setAlbumOfTheDay);

// musicController
router.route('/music/artist').post(musicController.saveArtist);
router.route('/music/album').post(musicController.saveAlbum);
router.route('/music/albums').get(musicController.readAlbums);
// profileController
router.route('/user').get(profileController.readUser);
router.route('/user/:userId').put(profileController.updateUser);
router.route('/user/:userId').delete(profileController.deleteUser);

// // eventsController
// router.route('/events').post(eventsController.saveEvent);
// router.route('/events').delete(eventsController.deleteEvent);


module.exports = router;
