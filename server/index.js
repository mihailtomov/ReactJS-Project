const express = require('express');
const { PORT } = require('./config/server.js');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'It\s working!' });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));