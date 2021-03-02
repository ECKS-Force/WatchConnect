const express = require('express');
const { addUser, checkPassword } = require('../controllers/userController.js');

const authRouter = express.Router();

authRouter.post('/signup', addUser, (req, res) => {
  return res.sendStatus(200);
});

authRouter.post('/signin', checkPassword, (req, res) => {
  return res.status(200).json(res.locals.password);
});

module.exports = authRouter;
