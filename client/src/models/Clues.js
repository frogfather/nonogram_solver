import Clue from '../models/Clue';

var Clues = function(options){
  var results = [];
  var clue1;
  var cluelength = options.length;
  for (var i=0; i< cluelength;i++){
    clue1 = new Clue({colour: options[i].colour, number: options[i].number, solved: options[i].solved})
    results.push(clue1)
  }
  return results;
}

module.exports = Clues;
