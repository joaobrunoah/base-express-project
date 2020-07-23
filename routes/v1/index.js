const express = require('express');
const router = express.Router();

const {verifyToken} = require('../../helpers/AuthMiddlewares');
const errorDictionary = require('../../helpers/errorDictionary');

/**
 * API Documentation
 */
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./routes/v1/documentation/swagger.yaml');

/**
 * ROUTES
 */
// AUTH ROUTES
// const loginRouter = require('./login');

/**
 * APIs
 */
// AUTH APIs
// router.use('/login', loginRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * ERROR HANDLER
 */
router.use((err, req, res, next) => {
  let errObj;
  
  if (!err) {
    errObj = errorDictionary.UNKNOWN;
  } else if (err.name === 'UniqueViolationError') {
    errObj = errorDictionary.DUP_KEY;
  } else if (err.name === 'DBError') {
    errObj = errorDictionary.INCORRECT_PARAMETERS;
    errObj.customMessage = err.nativeError.sqlMessage;
  } else if (err.name === 'ValidationError') {
    errObj = errorDictionary.INCORRECT_PARAMETERS;
    errObj.customMessage = err.message;
  } else if (err.code === 'ECONNREFUSED') {
    errObj = errorDictionary.LOST_DB;
  } else if (err.message && err.message.indexOf('Cannot convert') >= 0) {
    errObj = errorDictionary.NOT_FOUND;
  } else if (err.message && err.message.indexOf('Forbidden') >= 0) {
    errObj = errorDictionary.FORBIDDEN;
  } else if (err.code && err.code.indexOf('ERR_ASSERTION') >= 0) {
    errObj = errorDictionary.INCORRECT_CREDENTIALS;
  } else if (err.statusCode) {
    errObj = err;
  } else {
    errObj = errorDictionary.UNKNOWN;
    console.error(err);
    errObj.err = err;
  }
  
  // Sends an error
  // set locals, only providing error in development
  res.locals.message = errObj.message;
  res.locals.error = req.app.get('env') === 'development' ? errObj : {};
  
  res.status(errObj.statusCode || errObj.err.status || 500);
  if (err.render_layout) {
    return res.render(err.render_layout, { ...err.layout_variables, flash: errObj.message });
  }
  
  // render the error page
  
  res.send(res.locals);
});

module.exports = router;
