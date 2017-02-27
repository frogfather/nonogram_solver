var assert = require('assert');
var Solvings = require('../solvings.js');

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

    data3 = {
      row: false,
      component:2,
      cells: ['black','black','cross','cross','cross'],
      clues: [2]
    };

    data4 = {
      row: false,
      component:2,
      cells: ['clear','clear','clear','clear','black','clear','clear','black','black','clear','cross','clear','clear','clear','clear'],
      clues: [2,6,1]
    };
    spaces1 = [{spacelength:5, clues: []},{spacelength:4, clues: []},{spacelength:4, clues: []}];
    clues1 = [{id:1, colour:'black', number:3},{id:2, colour:'black', number:1},{id:3, colour:'black', number:4}]
  });

  it('should return 5 as playable length', function () {
    assert.deepEqual(Solvings.getPlayable(data1.cells),['clear','clear','black','black','black']);
  });

  it('should return 20 as playable length', function () {
    assert.deepEqual(Solvings.getPlayable(data2.cells),['clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear','clear']);
  });
 
  it('should return 0 as playable length', function () {
    assert.deepEqual(Solvings.getPlayable(data3.cells),[]);
  });

  it('should return 15 as playable length', function () {
    assert.equal(Solvings.getPlayable(data4.cells).length,15);
  });

  it('should return an array with the correct clue distribution', function () {
    assert.deepEqual(Solvings.clueDistribution(spaces1,clues1,false),[{spacelength:5, clues: [0,1]},{spacelength:4, clues: [1,2]},{spacelength:4, clues: [2]}]);
  });

  


})