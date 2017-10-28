import Puzzle from './puzzle'

var Puzzles = function(){
}

Puzzles.prototype = {


  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },

  all: function(callback){
    var self = this;
    this.makeRequest("http://localhost:3000/api/puzzles", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);
      var puzzleList = self.populatePuzzles(results);
      callback(puzzleList)
      });
  },

  populatePuzzles: function(results){
    var puzzles = [];
    for(var result of results){
      var puzzle = new Puzzle(result);
      console.log(puzzle)
      puzzles.push(puzzle);
    }
    return puzzles;

  }

}

module.exports = Puzzles;
