var solvings = {

getPlayable: function(data){
  if (data.findIndex(function(currentValue){
    return (currentValue === 'clear')
  }) === -1){return []}

  var firstFree = data.findIndex(function(currentValue){
    return (currentValue != 'cross');
  });
  //need to find last free space.
  var lastFree = (data.length -1);
  var i = (data.length -1);
  while (data[i] === 'cross'){
    i--
    lastFree = i
  }
  if (lastFree - firstFree === 0 )return [];
  result = data.slice(lastFree+1,data.length-1);
  return result.slice(0,firstFree)
},

overlap: function(data){
  //data will contain an array of cells and array of clues and some other stuff


  }
}

        
    



module.exports = solvings;
