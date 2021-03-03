const express = require('express');
const { getFriendsList, addFriend, deleteFriend, friendSearch } = require('../controllers/followerController.js');
const { showSearch, showInfo } = require('../controllers/apiController.js')

const appRouter = express.Router();

appRouter.get('/friendsList', getFriendsList, (req, res) => {
  return res.status(200).json(res.locals.friends);
});

appRouter.post('/follow', addFriend, getFriendsList, (req, res) => {
  return res.status(200).json(res.locals.friends);
});

appRouter.delete('/unfollow', deleteFriend, getFriendsList, (req, res) => {
  return res.status(200).json(res.locals.friends);
});

appRouter.get('/friendSearch/:search', friendSearch, (req, res) => {
  return res.status(200).json(res.locals.search);
});

appRouter.get('/showSearch/:search', showSearch, (req, res) => {
  return res.status(200).json(res.locals.search);
})

appRouter.get('/showInfo/:type/:id', showInfo, (req, res) => {
  return res.status(200).json(res.locals.info);
})

module.exports = appRouter;
