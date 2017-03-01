import Clues from '../models/Clues'

var Rows = function(options){
  var results = []
  var rowlength = options.rows.length;
  var row;
  for (var i = 0; i< rowlength; i++){
  row = new Clues(options.rows[i]) 
  results.push(row);
  }
  return results;
}

module.exports = Rows;