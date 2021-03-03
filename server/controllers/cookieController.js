const cookieController = {};

cookieController.setCookies = (req, res, next) => {
  res.cookie('session', true);
  res.cookie('username', res.locals.username, { httpOnly: true });
  return next();
};

cookieController.deleteCookies = (req, res, next) => {
  //   res.cookie('session', false, { maxAge: 0 });
  //   res.cookie('userID', req.cookies.username, { maxAge: 0 }, { httpOnly: true });
  res.clearCookie('session');
  res.clearCookie('username');
  return next();
};

module.exports = cookieController;
