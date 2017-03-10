var MongoClient = require('mongodb').MongoClient;

var NonoQuery = function(){ //NEW
  this.url = 'mongodb://localhost:27017/nono';
}

NonoQuery.prototype = {

  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db) {
        var collection = db.collection('puzzles');
        collection.find().toArray(function(err, docs) {
          onQueryFinished(docs);
         });
        });

  },


  add: function(puzzleToAdd, onQueryFinished) {
    console.log(this.url);
    MongoClient.connect(this.url, function(err, db) {
      if(db){
          var collection = db.collection('nonograms');
          if (nonoToAdd._id === undefined){
            console.log("undefined id")
          collection.save(nonoToAdd);
          }else
          {
          console.log("id not undefined")
          //find the nono
          var found = collection.find({timestamp: nonoToAdd.timestamp})

          updatedPuzzle = {}
          updatedPuzzle["title"] = puzzleToAdd.title;
          updatedPuzzle["body"] = puzzleToAdd.body;
          updatedPuzzle["emoji"] = puzzleToAdd.emoji;
          updatedPuzzle["date"] = puzzleToAdd.date;
          updatedPuzzle["timestamp"] = puzzleToAdd.timestamp;
          collection.update({timestamp: puzzleToAdd.timestamp},updatedPuzzle);
          }
          collection.find().toArray(function(err, docs) {
          onQueryFinished(docs);
          });
        };
    });
  },

  delete: function(puzzleToDelete,onQueryFinished){
    MongoClient.connect(this.url, function(err, db) {
      if(db){
          var collection = db.collection('nonograms');
         collection.remove({timestamp: memoToDelete.timestamp});
         collection.find().toArray(function(err, docs) {
          onQueryFinished(docs);
          });
        }
      })
  }
}
module.exports = NonoQuery;
