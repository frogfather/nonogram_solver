import Rows from '../models/Rows'
import Cols from '../models/Cols'
import Griddata from '../models/Griddata'


var Gamedata = function(){
  var rows = new Rows({rows:[
    [{colour: 'black', number: 3, solved: -1}],
    [{colour: 'black',number: 3, solved: -1},{colour: 'black',number: 1, solved: -1}],
    [{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 1, solved: -1}],
    [{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 4, solved: -1}],
    [{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 6, solved: -1},{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 7, solved: -1}],
    [{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 6, solved: -1},{colour: 'black',number: 3, solved: -1}],
    [{colour: 'black',number: 10, solved: -1},{colour: 'black',number: 1, solved: -1}],
    [{colour: 'black',number: 4, solved: -1}],
    [{colour: 'black',number: 4, solved: -1}],
    [{colour: 'black',number: 8, solved: -1}],
    [{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 2, solved: -1}],
    [{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 6, solved: -1},{colour: 'black',number: 2, solved: -1}],
    [{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 1, solved: -1}],
    [{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 1, solved: -1},{colour: 'black',number: 2, solved: -1},{colour: 'black',number: 2, solved: -1}],
    [{colour: 'black',number: 4, solved: -1},{colour: 'black',number: 5, solved: -1}],
    ]});
  var cols = new Cols({cols:[
    [{colour: 'black', number: 2, solved: -1}],
    [{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 2, solved: -1}],
    [{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 5, solved: -1}],
    [{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 1, solved: -1}],
    [{colour: 'black', number: 3, solved: -1},{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 4, solved: -1}],
    [{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 6, solved: -1},{colour: 'black', number: 1, solved: -1}],
    [{colour: 'black', number: 12, solved: -1}],
    [{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 8, solved: -1}],
    [{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 7, solved: -1},{colour: 'black', number: 1, solved: -1}],
    [{colour: 'black', number: 3, solved: -1},{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 2, solved: -1}],
    [{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 2, solved: -1}],
    [{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 2, solved: -1}],
    [{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 2, solved: -1},{colour: 'black', number: 1, solved: -1}],
    [{colour: 'black', number: 5, solved: -1},{colour: 'black', number: 2, solved: -1}],
    [{colour: 'black', number: 3, solved: -1},{colour: 'black', number: 2, solved: -1}],
    [{colour: 'black', number: 1, solved: -1},{colour: 'black', number: 1, solved: -1}],
    [{colour: 'black', number: 1, solved: -1}],
    [{colour: 'black', number: 1, solved: -1}],
    [{colour: 'black', number: 1, solved: -1}],
    [{colour: 'black', number: 1, solved: -1}]
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
  this.name = 'fencer';
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
