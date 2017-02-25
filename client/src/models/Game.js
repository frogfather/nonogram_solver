import Rows from '../Rows'
import Columns from '../Columns'
import Grid from '../Grid'


var Game = function(){
  var rows = new Rows();
  var columns = new Columns();
  var grid = new Grid();

  this.name = 'test puzzle';
  this.colours = [];
  this.rows = rows;
  this.columns = columns;
  this.grid = grid;
  this.saved = {
    time: null,
    user: null
  }
}