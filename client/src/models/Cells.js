import Cell from './Cell';

var Cells = function(options){
  var result = [];  
  var length = options.columns;
  var cell1;

  for (var i=0; i<length; i++){
      cell1 = new Cell({
      clueId: -1,
      autoValue: '',
      displayValue: ' ',
      testValue1: '',
      testValue2: '',
      lastChanged: {
        time: Date.now(),
        user: 'new'
        }
    });
  result.push(cell1);    
  }
  
 return result;
}

module.exports = Cells;