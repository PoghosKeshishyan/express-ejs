const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/users'));

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port);
});