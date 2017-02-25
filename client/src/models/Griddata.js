import Cells from './Cells';

var Griddata = function(options){
  var rowcount = options.rows;
  var colcount = options.cols;
  var result = [];
  var row1;
  for (var i=0; i< rowcount; i++){
    row1 = new Cells({columns:colcount})
    result.push(row1);
  }

  return result;
}

module.exports = Griddata;