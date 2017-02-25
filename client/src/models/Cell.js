
var Cell = function(options){
  this.clueId = options.clueId;
  this.autoValue = options.autoValue;
  this.displayValue = options.displayValue;
  this.testValue1 = options.testValue1;
  this.testValue2 = options.testValue2;
  this.lastChanged = {
    time: options.lastChanged.time,
    by: options.lastChanged.by
    }
};

Cell.prototype = {

  updateTimeStamp : function(user){
    this.lastChanged.time = Date.now;
    this.lastChanged.by = user;
  }

};

module.exports = Cell;