import express from "express";
import searchController from "./searchController";
import albumOfTheDayController from "./albumOfTheDayController";
import musicController from "./musicController";
import eventsController from "./eventsController";
import profileController from "./profileController";
import albumIdController from "./albumIdController";
import reviewsController from "./reviewsController";

const router = express.Router();

router.route('/search/:search').get(searchController.handleSearch);

router.route('/albums/:artistName/:albumName/reviews').get(reviewsController.getReviews);
router.route('/albums/:artistName/:albumName/review/:userId').post(reviewsController.createReview);
router.route('/albums/review/:id/:userId').delete(reviewsController.deleteReview);
router.route('/albums/review/:id/:userId').put(reviewsController.updateReview);

router.route('/album-of-the-day').post(albumOfTheDayController.setAlbumOfTheDay);
router.route('/album-of-the-day').get(albumOfTheDayController.getAlbumOfTheDay);
router.route('/album-of-the-day/:id').put(albumOfTheDayController.editAlbumOfTheDay);
router.route('/album-of-the-day/:id').delete(albumOfTheDayController.deleteAlbumOfTheDay);

router.route('/music/artist').post(musicController.saveArtist);
router.route('/music/album').post(musicController.saveAlbum);
router.route('/music/albums').get(musicController.readAlbums);

router.route('/user').get(profileController.readUser);
router.route('/user/:userId').put(profileController.updateUser);
router.route('/user/:userId').delete(profileController.deleteUser);

router.route('/album-id').post(albumIdController.getAlbumId);

router.route('/events').post(eventsController.saveEvent);
router.route('/events').delete(eventsController.deleteEvent);

export default router;
