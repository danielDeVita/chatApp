import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import socket from './socket.js';

const app = express();

app.use(express.static(`${__dirname}/public`));

const httpServer = app.listen(8080, () => {
    console.log(`listening on port 8080`)
});

socket.connect(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);