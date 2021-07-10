const express = require('express');
const { PORT } = require('./config/server');
const cors = require('cors');
const routes = require('./routes');
const { auth } = require('./middlewares/authorization');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');

const app = express();
require('./config/mongoose');

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors({ maxAge: 600 }));
app.use(express.json());

app.use(auth);
app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));