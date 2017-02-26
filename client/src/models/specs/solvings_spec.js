var assert = require('assert');
var Solvings = require('../solvings');

describe('solvings', function () {
  var data;

  beforeEach(function (){
    data1 = {
      row: true,
      component:3,
      cells: ['cross','cross','clear','clear','black','black','black','cross','cross','cross'],
      clues: [5]
    };
    data2 = {
      row: false,
      component:2,
      cells: ['clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear'],
      clues: [5,6,1,3]
    };

  });

  it('should return 5 as playable length', function () {
    assert.equal(solvings.getPlayable(data1.cells));
  });

})