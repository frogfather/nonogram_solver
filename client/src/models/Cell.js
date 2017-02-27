
var Cell = function(options){
  this.cellRow = options.cellRow;
  this.cellCol = options.cellCol;
  this.clueId = options.clueId;
  this.autoValue = options.autoValue;
  this.userValue = options.userValue;
  this.displayValue = options.displayValue;
  this.testValue1 = options.testValue1;
  this.testValue2 = options.testValue2;
  this.show = options.show;
  this.lastChanged = {
    time: options.lastChanged.time,
    user: options.lastChanged.user
    }
};

Cell.prototype = {

  updateTimeStamp : function(user){
    this.lastChanged.time = Date.now;
    this.lastChanged.user = user;
  }

};

module.exports = Cell;