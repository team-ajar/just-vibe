const express = require('express');
const searchController = require('./searchController');
const albumOfTheDayController = require('./albumOfTheDayController');
const musicController = require('./musicController');
const eventsController = require('./eventsController');
const profileController = require('./profileController');
const albumIdController = require('./albumIdController');
const reviewsController = require('./reviewsController');
const topThreeController = require('./topThreeController');
const router = express.Router();

//searchController
router.route('/search/:search').get(searchController.handleSearch);

//topThreeController (Albums)

router.route('/albums/:userId').get(topThreeController.getTopAlbums);
router.route('/albums/:albumId/:position/:userId').post(topThreeController.createTopAlbum);
router.route('/albums/:albumId/:position/:userId').put(topThreeController.updateTopAlbum);
router.route('/albums/:albumId/:position/:userId').delete(topThreeController.deleteTopAlbum);


// reviewsController
router.route('/albums/:artistName/:albumName/reviews').get(reviewsController.getReviews);
router.route('/albums/:artistName/:albumName/review/:userId').post(reviewsController.createReview);
router.route('/albums/review/:id/:userId').put(reviewsController.updateReview);
router.route('/albums/review/:id/:userId').delete(reviewsController.deleteReview);

// albumOfTheDayController
router.route('/album-of-the-day').post(albumOfTheDayController.setAlbumOfTheDay);
router.route('/album-of-the-day').get(albumOfTheDayController.getAlbumOfTheDay);
router.route('/album-of-the-day/:id').put(albumOfTheDayController.editAlbumOfTheDay);
router.route('/album-of-the-day/:id').delete(albumOfTheDayController.deleteAlbumOfTheDay);

// musicController
router.route('/music/artist').post(musicController.saveArtist);
router.route('/music/album').post(musicController.saveAlbum);
router.route('/music/albums').get(musicController.readAlbums);

// profileController
router.route('/user').get(profileController.readUser);
router.route('/user/:userId').put(profileController.updateUser);
router.route('/user/:userId').delete(profileController.deleteUser);

// getAlbumIdController
router.route('/album-id').post(albumIdController.getAlbumId);

// // eventsController
// router.route('/events').post(eventsController.saveEvent);
// router.route('/events').delete(eventsController.deleteEvent);

module.exports = router;
