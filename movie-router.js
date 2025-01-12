// filepath: /D:/movieDB/routes/movie-router.js
const express = require('express')
const movieController = require('../controllers/movie-controller')

const router = express.Router()

router.get('/api/movie', movieController.searchMovie)
router.get('/api/movie/popular', movieController.getPopularMovies) // Added route for popular movies

module.exports = router