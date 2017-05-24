import Cells from './Cells';

var Griddata = function(options){
  var rowcount = options.grid.length;
  var colcount = options.grid[0].length;
  var result = [];
  var row1;
  for (var i=0; i< rowcount; i++){
    row1 = new Cells({row: i, grid:options.grid[i]})
    result.push(row1);
  }

  return result;
}

module.exports = Griddata;
