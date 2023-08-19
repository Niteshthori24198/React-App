
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const { connection } = require('./config/db');
const { bookRouter } = require('./routes/book');

const app = express()

const PORT = process.env.PORT || 8080;

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
    res.send('Home Page')
})


app.use('/api/book', bookRouter)

app.listen(PORT, async (req, res) => {
    try {
        await connection;
        console.log('DB connceted');
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
})