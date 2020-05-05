// Dictionaries
const errorDictionary = require('../helpers/errorDictionary');

// Forces authentication when testing with JEST
const testAuthTokens = require('../testing/testAuthTokens');

const verifyToken = async (req, res, next) => {
  let auth_token = req.headers['authorization'] || req.headers['Authorization'];

  if(!auth_token) {
    return next(errorDictionary.NO_AUTH_TOKEN);
  }

  try {
    // Tokens used when testing APIs
    if(process.env.NODE_ENV === 'test') {
      if(testAuthTokens[auth_token]) {
        req.user = {};
        return next();
      }
    }

    const [,jwt_token] = auth_token.split(' ');

    if(!jwt_token) {
      return next(errorDictionary.INVALID_TOKEN);
    }

    //let id_user = await jwt.verify(jwt_token, process.env.JWT_SECRET).id_user;
    req.user = {};
    if(!req.user) {
      return next(errorDictionary.INVALID_TOKEN);
    }
    return next();
  } catch (err) {
    if(!err) return next(errorDictionary.UNKNOWN);
    // Check errors of invalid token
    if(err.message === 'invalid token') return next(errorDictionary.INVALID_TOKEN);
    // Check errors of expired token
    if(err.message === 'jwt expired') return next(errorDictionary.EXPIRED_TOKEN);

    return next(err);
  }
};
//
// const adminOrUser = (req, res, next) => {
//   let id_user = req.params.id_user;
//   if(!req.user || req.user.is_admin !== 1 && Number(id_user) !== Number(req.user.id_user)) {
//     return next(errorDictionary.FORBIDDEN);
//   }
//   return next();
// };
//
// const onlyAdmin = (req, res, next) => {
//   if(!req.user || req.user.is_admin !== 1) {
//     return next(errorDictionary.FORBIDDEN);
//   }
//   return next();
// };
//
// const onlyUser = (req, res, next) => {
//   let id_user = req.params.id_user;
//   if(!req.user || Number(id_user) !== Number(req.user.id_user)) {
//     return next(errorDictionary.FORBIDDEN);
//   }
//   return next();
// };

module.exports = {
  // adminOrUser,
  // onlyAdmin,
  // onlyUser,
  verifyToken,
};