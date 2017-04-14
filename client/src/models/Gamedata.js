import Rows from '../models/Rows'
import Cols from '../models/Cols'
import Griddata from '../models/Griddata'


var Gamedata = function(){
  var rows = new Rows({rows:[
    //make colour an array the same length as data
    {colour: 'black', data: [3], solved: -1},
    {colour: 'black',data: [3,1], solved: -1},
    {colour: 'black',data: [2,2,1,1], solved: -1},
    {colour: 'black',data: [1,1,1,2,4], solved: -1},
    {colour: 'black',data: [1,6,2,7], solved: -1},
    {colour: 'black',data: [2,6,3], solved: -1},
    {colour: 'black',data: [10,1], solved: -1},
    {colour: 'black',data: [4], solved: -1},
    {colour: 'black',data: [4], solved: -1},
    {colour: 'black',data: [8], solved: -1},
    {colour: 'black',data: [1,2,2], solved: -1},
    {colour: 'black',data: [1,6,2], solved: -1},
    {colour: 'black',data: [1,1,2,1], solved: -1},
    {colour: 'black',data: [2,1,2,2], solved: -1},
    {colour: 'black',data: [4,5], solved: -1}
    ]});
  var cols = new Cols({cols:[
    {colour: 'black', data: [2], solved: -1},
    {colour: 'black', data: [1,2,2], solved: -1},
    {colour: 'black', data: [1,2,5], solved: -1},
    {colour: 'black', data: [1,1,1,1], solved: -1},
    {colour: 'black', data: [3,1,4], solved: -1},
    {colour: 'black', data: [2,6,1], solved: -1},
    {colour: 'black', data: [12], solved: -1},
    {colour: 'black', data: [2,8], solved: -1},
    {colour: 'black', data: [1,7,1], solved: -1},
    {colour: 'black', data: [3,2,1,2], solved: -1},
    {colour: 'black', data: [1,1,2,2], solved: -1},
    {colour: 'black', data: [2,1,2,2], solved: -1},
    {colour: 'black', data: [1,1,2,1], solved: -1},
    {colour: 'black', data: [5,2], solved: -1},
    {colour: 'black', data: [3,2], solved: -1},
    {colour: 'black', data: [1,1], solved: -1},
    {colour: 'black', data: [1], solved: -1},
    {colour: 'black', data: [1], solved: -1},
    {colour: 'black', data: [1], solved: -1},
    {colour: 'black', data: [1], solved: -1}
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
  this.name = 'test puzzle';
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
