import Clue from '../models/Clue';

var Clues = function(options){
  var results = [];
  var clue1;
  var data = options.data;
  for (var i=0; i< data.length;i++){
    clue1 = new Clue({colour: options.colour, number: data[i]})
    results.push(clue1)
  }

  return results;
}

module.exports = Clues;