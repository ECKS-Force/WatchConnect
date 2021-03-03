const express = require('express');
const { addUser, checkPassword } = require('../controllers/userController.js');
const { setCookies, deleteCookies } = require('../controllers/cookieController.js');

const authRouter = express.Router();

authRouter.post('/signup', addUser, setCookies, (req, res) => {
  return res.sendStatus(200);
});

authRouter.post('/signin', checkPassword, setCookies, (req, res) => {
  return res.sendStatus(200);
});

authRouter.delete('/logout', deleteCookies, (req, res) => {
  return res.sendStatus(200);
});

module.exports = authRouter;
