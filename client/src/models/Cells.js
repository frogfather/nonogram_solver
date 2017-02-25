import Cell from './Cell';

var Cells = function(){


  var cell1 = new Cell({
      clueId: 1,
      autoValue: 'X',
      displayValue: 'X',
      testValue1: 'test1',
      testValue2: 'test2',
      lastChanged: {
        time: Date.now(),
        by: 'new'
        }
  });
  
  var cell2 = new Cell({
      clueId: 2,
      autoValue: 'O',
      displayValue: '0',
      testValue1: 'oh',
      testValue2: 'wibble',
      lastChanged: {
        time: Date.now(),
        by: 'me',
        }
  });
 
 return[cell1, cell2];
}

module.exports = Cells;