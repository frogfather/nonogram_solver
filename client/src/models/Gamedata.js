import Rows from '../models/Rows'
import Cols from '../models/Cols'
import Griddata from '../models/Griddata'


var Gamedata = function(){
  var rows = new Rows({rows:[
    [{}],[{}],[{}],[{}],[{}],[{}],[{}],[{}],[{}],[{}],[{}],[{}],[{}],[{}],[{}]]});
  var cols = new Cols({cols:[
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}],
    [{}]
    ]});
  var griddata = new Griddata(
    {grid: [
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]]}
    );
  this.name = 'New Puzzle';
  this.colours = [];
  this.rows = rows;
  this.cols = cols;
  this.grid = griddata;
  this.saved = {
    time: null,
    user: null
  }
}

module.exports = Gamedata;
