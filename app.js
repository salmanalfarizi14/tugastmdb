// filepath: /D:/movieDB/server.js
const express = require('express')
const movieRouter = require('./routes/movie-router')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(movieRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})