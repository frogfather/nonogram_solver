var solvings = {

getPlayable: function(data){
  var cells = data;
  var cellValues = data.map(function(cell){
    return cell.autoValue;
  }) 

  if (cellValues.findIndex(function(currentValue){
    return (currentValue === 'clear')
  }) === -1){return []}

  var firstFree = cellValues.findIndex(function(currentValue){
    return (currentValue != 'cross');
  });
  //need to find last free space.
  var lastFree = (cellValues.length -1);
  var i = (cellValues.length -1);
  while (cellValues[i] === 'cross'){
    i--
    lastFree = i
  }
  if (lastFree - firstFree === 0 )return [];
  var result = cells.slice(0,lastFree+1)
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
  var clueArray = clues.map(function(clue){
    return clue.number;
  }); 
  var spaceArray = spaces.map(function(space){
    return space.spacelength;
  });
  var prevSpace;
  var nextSpace;
  var currSpace;
  var prevData;
  var currData;
  var nextData;
  var currArray;
  for (var space=0;space<spaces.length;space++){
    currSpace = spaceArray[space];
    if (space > 0){
      prevSpace = spaceArray.slice(0,space).reduce(function(total,num){
        return total+num;})
      }
    else{prevSpace =0}

    if (space < spaceArray.length - 1){
    nextSpace = spaceArray.slice(space+1,spaceArray.length).reduce(function(total,num){
      return total+num;
      })}
    else{nextSpace = 0;}
    for (var startPos = 0; startPos < clues.length;startPos++){
      if (startPos > 0){
         prevData = clueArray.slice(0,startPos).reduce(function(total,num,index){
           if ((index > 0)&&(!colour)){return total + num +1}else{return total + num}
         });
        }else
        {prevData = 0;}
      currData = 0;
      for (var clue = startPos; clue < clueArray.length; clue++){
          currArray =clueArray.map(function(clue,index){
            return index;
          }).slice(startPos,clue+1); 

          currData = clueArray.slice(startPos,clue+1).reduce(function(total,num,index){
            if ((index > 0)&&(!colour)){return total + num +1}else{return total + num}
          });
        if (clue < clueArray.length-1){
         nextData = clueArray.slice(clue+1,clueArray.length).reduce(function(total,num,index){
            if ((index > 0)&&(!colour)){return total + num +1}else{return total + num}
          });}else {nextData = 0}
      if ((currData <= currSpace)
        &&(nextSpace >= nextData)
        &&(prevSpace >= prevData)){
        for (var i = 0 ; i< currArray.length;i++){
        if ( spaces[space].clues.indexOf(currArray[i]) === -1){  
        spaces[space].clues.push(currArray[i]);}
        }
      }  
    }
  }
  }
 return spaces; 
},

overlap: function(data){
  var result = [];
  var cells = data.cells;
  var clues = data.clues;
  var playable = this.getPlayable(cells);
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
    var offset=0;
    var startpoint=0;
    var endpoint=0;
    var testArrayLeft = [];
    var testArrayRight = [];
    var totalLength;
    var clueLengths;
    var selectedClues;
    var myClues = clues;
    var clueValues = clues.map(function(clue){
      return clue.number;
    });
    for (var space = 0; space < spaces.length; space++){
      //see if there is any entry in the relevant clues array
      clueLengths = spaces[space].clues.map(function(item){
          return clueValues[item];
        }.bind(this));

      selectedClues = spaces[space].clues.map(function(item){
          return myClues[item];
        }.bind(this));

        if (clueLengths.length > 0){
        totalLength = clueLengths.reduce(function(total,item,index){
          if ((total > 0)&&(!data.colour)){
            return total + item+1
          }else {return total + item};
        });
      }else totalLength = 0;
        
        if (totalLength > (spaces[space].spacelength)/2){
          offset = spaces[space].spacelength - totalLength;
          testArrayLeft.length = spaces[space].spacelength;
          testArrayRight.length = spaces[space].spacelength;
          testArrayLeft.fill('clear');
          testArrayRight.fill('clear');
          //the two test arrays will just be values - clear, cross or colour
          //selectedclues.number
          for (var i=0;i<selectedClues.length;i++){
            endpoint += selectedClues[i].number;
            console.log(startpoint)
            console.log(endpoint)
            for (var j=startpoint; j<endpoint;j++){
                testArrayLeft[j] = selectedClues[i].colour;
                testArrayRight[j+offset] = selectedClues[i].colour;
              }
            startpoint = endpoint;
            if ((i<selectedClues.length-1)&&(!data.colour)){
              testArrayLeft[startpoint] = 'cross';
              testArrayRight[startpoint+offset] = 'cross'
              startpoint +=1;
              endpoint+=1;
              }  
            }
          console.log(testArrayLeft)
          console.log(testArrayRight)  
          }
      }
    }
  
  }
}

        
    



module.exports = solvings;
