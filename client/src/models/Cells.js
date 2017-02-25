import Cell from './Cell';

var Cells = function(){


  var cell1 = new Cell({
      clueId: -1,
      autoValue: '',
      displayValue: '',
      testValue1: '',
      testValue2: '',
      lastChanged: {
        time: Date.now(),
        user: 'new'
        }
  });
  
  var cell2 = new Cell({
      clueId: -1,
      autoValue: '',
      displayValue: '',
      testValue1: '',
      testValue2: '',
      lastChanged: {
        time: Date.now(),
        user: 'me',
        }
  });
 
 return[cell1, cell2];
}

module.exports = Cells;