var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const InitializeDb = require('./database/initializeDatabase');

/**
 * Configure Database
 */
if(process.env.NODE_ENV !== 'test') {
  InitializeDb.initializeDatabase().then().catch(err => {
    console.error(err);
  });
}

var app = express();

app.use(cors());
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
const versionRouter = require('./routes');
app.use('/', versionRouter);

// Configure API Documentation
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./documentation/swagger.yaml');

module.exports = app;
