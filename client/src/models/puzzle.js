import Rows from '../models/Rows'
import Cols from '../models/Cols'
import Griddata from '../models/Griddata'

var Puzzle = function(options){
  var id = null;
  var rows = new Rows(options);
  var cols = new Cols(options);
  var griddata = new Griddata(options);
  this["id"] = options._id;
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
