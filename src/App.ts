import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

import { CalculatorRouter } from './Routes/CalculatorRouter';
import { AuthenticationRouter } from './Routes/AuthenticationRouter';

const app: express.Application = express();
// Configuration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ 'name': 'Server is running' });
});

app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {

    response.status(err.status || 500);
    response.json({
        error: 'Server error'
    })
});
app.use('/api/calculator/', new CalculatorRouter().getRouter());
app.use('/api/authentication/', new AuthenticationRouter().getRouter());


const server: http.Server = app.listen(3000, function () {
    console.log('Server listening on port %d in %s mode', 3000, app.settings.env);
});

module.exports = server;