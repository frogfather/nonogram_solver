import Rows from '../models/Rows'
import Cols from '../models/Cols'
import Griddata from '../models/Griddata'


var Gamedata = function(){
  var rows = new Rows({rows:[
    {colour: 'black', data: [3]},{colour: 'black',data: [3,1]},{colour: 'black',data: [2,2,1,1]},{colour: 'black',data: [1,1,1,2,4]},{colour: 'black',data: [1,6,2,7]},{colour: 'black',data: [2,6,3]},{colour: 'black',data: [10,1]},{colour: 'black',data: [4]},{colour: 'black',data: [4]},{colour: 'black',data: [8]},{colour: 'black',data: [1,2,2]},{colour: 'black',data: [1,6,2]},{colour: 'black',data: [1,1,2,1]},{colour: 'black',data: [2,1,2,2]},{colour: 'black',data: [4,5]}
    ]});
  var cols = new Cols({cols:[
    {id:0, colour: 'black', data: [2]},{id:1, colour: 'black', data: [1,2,2]},{id:2, colour: 'black', data: [1,2,5]},{id:3, colour: 'black', data: [1,1,1,1]},{id:4, colour: 'black', data: [3,1,4]},{id:5, colour: 'black', data: [2,6,1]},{id:6, colour: 'black', data: [12]},{id:7, colour: 'black', data: [2,8]},{id:8, colour: 'black', data: [1,7,1]},{id:9, colour: 'black', data: [3,2,1,2]},{id:10, colour: 'black', data: [1,1,2,2]},{id:11, colour: 'black', data: [2,1,2,2]},{id:12, colour: 'black', data: [1,1,2,1]},{id:13, colour: 'black', data: [5,2]},{id:14, colour: 'black', data: [3,2]},{id:15, colour: 'black', data: [1,1]},{id:16, colour: 'black', data: [1]},{id:17, colour: 'black', data: [1]},{id:18, colour: 'black', data: [1]},{id:19, colour: 'black', data: [1]}
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