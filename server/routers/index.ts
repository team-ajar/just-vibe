const express = require('express');
const searchController = require('./searchController');
// const eventsController = require('./eventsController');
// const profileController = require('./profileController');
// const reviewsController = require('./reviewsController');
const router = express.Router();

router.route('/search/:search').get(searchController.handleSearch);

export default router;
