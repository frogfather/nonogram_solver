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
  var result = data.slice(0,lastFree+1)
  result.splice(0,firstFree);
  return result;
},

getDistinctSpaces: function(data){
var result = [];
var spaceData={};
var spacelength = 0;
if (data.length > 0){
  for (var i=0; i<data.length; i++){
    if (data[i]==='cross'){
      if (spacelength >0){
        spaceData = {spacelength:spacelength,clues:[]}
        result.push(spaceData);
        spacelength =0;
      }
    }else{
      spacelength += 1;
    }
  }
if (spacelength > 0){
  spaceData = {spacelength:spacelength,clues:[]}
  result.push(spaceData);
  }  
}
return result;
},

clueDistribution: function(spaces,clues,colour){
  console.log(clues);
  console.log(spaces);
  var totalClueLength;
  var totalDataLength = clues.map(function(clue){
    return clue.number;
  }).reduce(function(total,num){
      return total + num;
    });
  if (!colour){
    totalDataLength += clues.length-1;
  }
  var totalSpace = spaces.map(function(space){
    return space.spacelength;
  }).reduce(function(total,num){
    return total+num;
  });
  var remainingSpace = totalSpace;
  var remainingDataLength;
  for (var space=0;space<spaces.length;space++){
    totalClueLength = 0;
    remainingDataLength = totalDataLength;
    remainingSpace -= spaces[space].spacelength;
    
    console.log('remaining data length '+remainingDataLength);
    console.log('remainingSpace '+remainingSpace);

    for (var clue = 0; clue < clues.length; clue++){
      if ((clue > 0)&&(!colour)){
        totalClueLength += 1;
        }
      totalClueLength += clues[clue].number;
      remainingDataLength -= clues[clue].number;
      if ((clue < clues.length - 1)&&(!colour)){remainingDataLength -= 1}

    console.log('remaining data length '+remainingDataLength);
    console.log('total clue length '+totalClueLength);
    console.log('current space length '+spaces[space].spacelength);
      if ((totalClueLength <= spaces[space].spacelength)
        &&(remainingSpace >= remainingDataLength)){
    console.log('passed')
      spaces[space].clues.push(clue);
      }  
    }
  console.log('moving to next space');
  console.log('');  
  }
 return spaces; 
},

overlap: function(data){
  var result = [];
  var cells = data.cells.map(function(cell){
    return cell.autoValue;
  })
  var clues = data.clues;
  var playable = this.getPlayable(cells);
  //need number of distict spaces then 
  //determine which (if any) clues can
  //fit in each.
  if (clues.length > 0){
  // occasionally you get rows with no clues at all!
  var spaces = this.getDistinctSpaces(playable);


  this.clueDistribution(spaces,clues,data.colour);
  
  var count; 
  var index;
  for (var i=0;i<clues.length;i++){
      //does this clue appear in more than one space?
      count = 0;
      for (var j = 0; j < spaces.length; j++){
        if (spaces[j].clues.indexOf(i) > -1){
          count +=1;
          }
        }
      if (count > 1){
        //remove all instances of that clue from spaces
      for (var j = 0; j < spaces.length; j++){
        index = spaces[j].clues.indexOf(i); 
          if (index>-1){
          spaces[j].clues.splice(index,1)}
          }
        }  
      }
    //now each space will contain clues that can't be anywhere else
    //for each space do an overlap check

    }
  
  }
}

        
    



module.exports = solvings;
