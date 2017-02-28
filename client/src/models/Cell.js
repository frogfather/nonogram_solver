
var Cell = function(options){
  this.cellRow = options.cellRow;
  this.cellCol = options.cellCol;
  this.autoValue = options.autoValue;
  this.userValue = options.userValue;
  this.testValue1 = options.testValue1;
  this.testValue2 = options.testValue2;
  this.testColour = options.testColour;
  this.show = options.show;
  this.lastchanged = {
    time: options.lastchanged.time,
    user: options.lastchanged.user
    }
};

Cell.prototype = {

  updateTimeStamp : function(user){
    this.lastChanged.time = Date.now;
    this.lastChanged.user = user;
  }

};

module.exports = Cell;