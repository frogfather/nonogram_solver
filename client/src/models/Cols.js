import Clues from '../models/Clues'

var Cols = function(options){
  var results = []
  var collength = options.cols.length;
  var col;
  for (var i = 0; i< collength; i++){
  col = new Clues(options.cols[i])
  results.push(col);
  }
  return results;
}

module.exports = Cols;
