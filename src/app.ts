import * as express from 'express';
// import * as bodyParser from 'body-parser';
const bodyParser = require('body-parser');

import { forwardHandler, errorHandler } from './middlewares/error-handler';
import userRouter from './routes/user';

const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';

app.set('host', 'localhost');
app.set('port', prod ? process.env.PORT : 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);

app.use(forwardHandler);
app.use(errorHandler);

export default app;
