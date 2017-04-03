import Clue from '../models/Clue';

var Clues = function(options){
  var results = [];
  var clue1;
  var cluelength = options.data.length;
  for (var i=0; i< cluelength;i++){
    clue1 = new Clue({colour: options.colour, number: options.data[i], solved: options.solved})
    results.push(clue1)
  }
  return results;
}

module.exports = Clues;
