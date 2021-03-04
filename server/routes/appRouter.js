const express = require('express');
const { getFriendsList, addFriend, deleteFriend, friendSearch } = require('../controllers/followerController.js');
const { getContentList } = require('../controllers/contentController');
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

appRouter.get('/content', )
module.exports = appRouter;
