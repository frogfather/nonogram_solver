var express = require('express');
var puzzleRouter = express.Router();
var PuzzleQuery = require('../db/nonoQuery');
var query = new PuzzleQuery();


puzzleRouter.get('/', function(req, res) {
  query.all(function(results){ //NEW
    res.json(results);
  });
});

module.exports = puzzleRouter;
