const { findUserBySessionId } = require('./bdAuth');

/* Мидервеэр проверки авторизации */
const mwAuth = () => async (req, res, next) => {
  if (!req.cookies['sessionId']) {
    return next();
  }
  const user = await findUserBySessionId(req.cookies['sessionId']);
  req.user = user;
  req.sessionId = req.cookies['sessionId'];
  next();
};

module.exports.mwAuth = mwAuth;
