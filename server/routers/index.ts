const express = require('express');
const searchController = require('./searchController');
const albumOfTheDayController = require('./albumOfTheDayController');
const musicController = require('./musicController');
// const eventsController = require('./eventsController');
const profileController = require('./profileController');
// const reviewsController = require('./reviewsController');
const albumIdController = require('./albumIdController');
const router = express.Router();

//searchController
router.route('/search/:search').get(searchController.handleSearch);

// reviewsController
// router.route('albums/:albumId/review').post(reviewsController.createReview);
// router.route('albums/:albumId/review/:id').delete(reviewsController.deleteReview);
// router.route('albums/:albumId/review/:id').put(reviewsController.updateReview);

// albumOfTheDayController
router.route('/album-of-the-day').post(albumOfTheDayController.setAlbumOfTheDay);
router.route('/album-of-the-day').get(albumOfTheDayController.getAlbumOfTheDay);
router.route('/album-of-the-day/:id').put(albumOfTheDayController.editAlbumOfTheDay);
router.route('/album-of-the-day/:id').delete(albumOfTheDayController.deleteAlbumOfTheDay);

// musicController
router.route('/music/artist').post(musicController.saveArtist);
router.route('/music/album').post(musicController.saveAlbum);

// profileController
router.route('/user').get(profileController.readUser);
router.route('/user/:userId').put(profileController.updateUser);
router.route('/user/:userId').delete(profileController.deleteUser);

// getAlbumIdController
router.route('/album-id').post(albumIdController.getAlbumId);

module.exports = router;
