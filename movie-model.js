const createMovie = (movieData) => {
    return {
        id: movieData.id,
        title: movieData.original_title,
        overview: movieData.overview,
        backdropPath: movieData.backdrop_path,
        releaseDate: movieData.release_date,
        voteAverage: movieData.vote_average
    }
}

module.exports = createMovie