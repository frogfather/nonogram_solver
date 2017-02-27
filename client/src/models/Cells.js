import Cell from './Cell';

var Cells = function(options){
  var result = [];  
  var length = options.columns;
  const row = options.row;
  var cell1;

  for (var i=0; i<length; i++){
      cell1 = new Cell({
      cellRow: row,
      cellCol: i,
      clueId: -1,
      autoValue: 'clear',
      displayValue: 'clear',
      userValue: 'clear',
      testValue1: 'clear',
      testValue2: 'clear',
      show: 'user',
      lastChanged: {
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