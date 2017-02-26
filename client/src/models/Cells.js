import Cell from './Cell';

var Cells = function(options){
  var result = [];  
  var length = options.columns;
  var cell1;

  for (var i=0; i<length; i++){
      cell1 = new Cell({
      clueId: -1,
      autoValue: 'clear',
      displayValue: 'clear',
      testValue1: 'clear',
      testValue2: 'clear',
      colour: 'gray',
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