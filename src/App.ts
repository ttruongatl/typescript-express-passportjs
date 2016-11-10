import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

import { CalculatorRouter } from './Routes/CalculatorRouter';
import { AuthenticationRouter } from './Routes/AuthenticationRouter';
import { BookRouter } from './Routes/BookRouter';

const app: express.Application = express();
// Configuration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ 'name': 'Server is running' });
});

app.use('/api/calculator/', new CalculatorRouter().getRouter());
app.use('/api/authentication/', new AuthenticationRouter().getRouter());
app.use('/api/book/', new BookRouter().getRouter());

const server: http.Server = app.listen(3000, function () {
    console.log('Server listening on port %d in %s mode', 3000, app.settings.env);
});

module.exports = server;