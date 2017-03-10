var assert = require('assert');
var Solvings = require('../solvings.js');

describe('solvings', function () {
  var data;

  beforeEach(function (){
    data1 = {
      row: true,
      component:3,
      cells: [{autoValue:'cross'},{autoValue:'cross'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'black'},{autoValue:'black'},{autoValue:'black'},{autoValue:'cross'},{autoValue:'cross'},{autoValue:'cross'}],
      clues: [5]
    };
    data2 = {
      row: false,
      component:2,
      cells: [{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'}],
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
      cells: [{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'black'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'black'},{autoValue:'black'},{autoValue:'clear'},{autoValue:'cross'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'}],
      clues: [2,6,1]
    };

    data5 = {
      row: false,
      component:2,
      cells: [
        {autoValue:'clear'},
        {autoValue:'black'},
        {autoValue:'cross'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'black'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'clear'},
        {autoValue:'black'},
        {autoValue:'clear'},
        {autoValue:'clear'}],
      clues: [{colour:'black', number:1},{colour:'black', number:6},{colour:'black', number:2}]
    };


    spaces1 = [{spacelength:5, clues: []},{spacelength:4, clues: []},{spacelength:4, clues: []}];
    clues1 = [{id:1, colour:'black', number:3},{id:2, colour:'black', number:1},{id:3, colour:'black', number:4}]

    spaces2 = [{spacelength:2, clues: []},{spacelength:3, clues: []},{spacelength:1, clues: []}];
    clues2 = [{id:1, colour:'black', number:3},{id:2, colour:'black', number:1}]
    clues3 = [{id:1, colour:'black', number:3},{id:2, colour:'black', number:1},{id:3, colour:'black', number:1}]
    clues4 = [{id:1, colour:'black', number:1},{id:2, colour:'black', number:1},{id:3, colour:'black', number:3}]
    clues5 = [{id:1, colour:'black', number:1},{id:2, colour:'green', number:1},{id:3, colour:'black', number:3}]
  });

  it('should return 5 as playable length', function () {
    assert.deepEqual(Solvings.getPlayable(data1.cells),[{autoValue:'clear'},{autoValue:'clear'},{autoValue:'black'},{autoValue:'black'},{autoValue:'black'}]);
  });

  it('should return 20 as playable length', function () {
    assert.deepEqual(Solvings.getPlayable(data2.cells),[{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'},{autoValue:'clear'}]);
  });

  it('should return 0 as playable length', function () {
    assert.deepEqual(Solvings.getPlayable(data3.cells),[]);
  });

  it('should return an array with the correct clue distribution', function () {
    assert.deepEqual(Solvings.clueDistribution(spaces1,clues1,false),[{spacelength:5, clues: [0,1]},{spacelength:4, clues: [1,2]},{spacelength:4, clues: [2]}]);
  });

  it('1 should return true', function () {
    assert.equal(Solvings.cluesWillFit(spaces2,clues2,false),true);
  });

  it('2 should return false', function () {
    assert.equal(Solvings.cluesWillFit(spaces2,clues3,false),false);
  });

  it('3 should return false', function () {
    assert.equal(Solvings.cluesWillFit(spaces2,clues3,false),false);
  });
  //first two clues will have space inserted between because colour = false
  it('4 should return false', function () {
    assert.equal(Solvings.cluesWillFit(spaces2,clues4,false),false);
  });
  //first two clues will have spaces inserted between because clues are same colour
  it('5 should return false', function () {
    assert.equal(Solvings.cluesWillFit(spaces2,clues4,true),false);
  });
  //first two clues will have no space inserted between as they are different colour
  it('6 should return true', function () {
    assert.equal(Solvings.cluesWillFit(spaces2,clues5,true),true);
  });
  //first two clues will have spaces inserted between because colour flag is false
  it('7 should return false', function () {
    assert.equal(Solvings.cluesWillFit(spaces2,clues5,false),false);
  });

  it('8 should return true', function () {
    assert.equal(Solvings.arrangementIsLegal(data5),true);
  });

})
