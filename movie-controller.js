// filepath: /D:/movieDB/controllers/movie-controller.js
const cache = require('../config/node-cache')
const tmdbAPI = require('../config/tmdb')
const createMovie = require('../models/movie-model')

const searchMovie = async (req, res) => {
    const query = req.query.query
    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" })
    }

    if (cache.has(query)) {
        console.log(`Fetch data from cache server: ${query}`)
        return res.status(200).json(cache.get(query))
    }

    try {
        const response = await tmdbAPI.get('/search/movie', {
            params: { query }
        })
        if (!response.data || !response.data.results) {
            return res.status(404).json({ message: "No results found" })
        }
        const movie = response.data.results.map(createMovie)
        cache.set(query, movie)
        res.status(200).json(movie)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const getPopularMovies = async (req, res) => {
    try {
        const response = await tmdbAPI.get('/movie/popular')
        if (!response.data || !response.data.results) {
            return res.status(404).json({ message: "No results found" })
        }
        const movies = response.data.results.map(createMovie)
        res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { searchMovie, getPopularMovies }