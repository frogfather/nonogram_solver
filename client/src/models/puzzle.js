import Rows from '../models/Rows'
import Cols from '../models/Cols'
import Griddata from '../models/Griddata'

var Puzzle = function(options){
  var rows = new Rows(options);
  var cols = new Cols(options);
  var griddata = new Griddata(options);
  this.name = options.name;
  this.colours = options.colours;
  this.rows = rows;
  this.cols = cols;
  this.grid = griddata;
  this.saved = {
    time: null,
    user: null
  }
};

Puzzle.prototype = {

};

module.exports = Puzzle;
