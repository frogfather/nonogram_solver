import Rows from '../models/Rows'
import Cols from '../models/Cols'
import Griddata from '../models/Griddata'

var Puzzle = function(options){
  var rows = new Rows(options.rows);
  var cols = new Cols(options.cols);
  var griddata = new Griddata(options.grid);
};

Puzzle.prototype = {

};

module.exports = Puzzle;