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
      var puzzles = self.populatePuzzles(results);
      callback(puzzles)
    });
  },

  populatePuzzles: function(results){ //NEW
    var puzzles = [];
    
    for(var result of results){
      console.log(result)
      var puzzle = new Puzzle(result);
      puzzles.push(puzzle);
    }
    return puzzles;
  }

}

module.exports = Puzzles;