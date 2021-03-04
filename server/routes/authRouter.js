const express = require('express');
const { addUser, checkPassword } = require('../controllers/userController.js');
const { setCookies, deleteCookies } = require('../controllers/cookieController.js');

const authRouter = express.Router();

// input: body {username, password}
authRouter.post('/signup', addUser, setCookies, (req, res) => {
  return res.sendStatus(200);
});

// input: body {username, password}
authRouter.post('/signin', checkPassword, setCookies, (req, res) => {
  return res.sendStatus(200);
});

authRouter.delete('/logout', deleteCookies, (req, res) => {
  return res.sendStatus(200);
});

module.exports = authRouter;
