var express = require('express');
var puzzleRouter = express.Router();
var PuzzleQuery = require('../db/nonoQuery');
var query = new PuzzleQuery();


puzzleRouter.get('/', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  console.log("get puzzles")
  query.all(function(results){
    res.json(results);
  });
});

puzzleRouter.post('/', function(req, res){
    query.add(req.body,function(docs){
    var length = docs.length;
    var returnedId = JSON.stringify(docs[length-1]);
    res.json({data: returnedId});
  })
});

puzzleRouter.delete('/',function(req,res){
    query.delete(req.body,function(docs){
      var length = docs.length;
      var returnedId = JSON.stringify(docs[length-1]);
      res.json({data: returnedId});
    })
});


module.exports = puzzleRouter;
