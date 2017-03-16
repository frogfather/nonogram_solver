import Cell from './Cell';

var Cells = function(options){
  var result = [];
  var length = options.grid.length;
  const row = options.row;
  var cell1;
  for (var i=0; i<length; i++){
      cell1 = new Cell({
      cellRow: row,
      cellCol: i,
      autoValue: 'clear',
      userValue: 'clear',
      testValue1: -1,
      testValue2: -1,
      testColour: 'clear',
      rowClue: 'none',
      colClue: 'none',
      show: 'user',
      lastchanged: {
        time: Date.now(),
        user: 'new'
        }
    });
  result.push(cell1);
  }

 return result;
}

Cells.prototype = {


}

module.exports = Cells;
