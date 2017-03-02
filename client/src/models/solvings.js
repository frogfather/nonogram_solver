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
  var spacestart = -1;
  if (data.length > 0){
    for (var i=0; i<data.length; i++){
      if (data[i].autoValue==='cross'){
        if (spacelength >0){
          spaceData = {spacelength:spacelength,spacestart:spacestart,clues:[]}
          result.push(spaceData);
          spacestart =-1;
          spacelength =0;
        }
      }else{
        spacelength += 1;
        if (spacestart === -1){spacestart = i}
      }
  }
  if (spacelength > 0){
    spaceData = {spacelength:spacelength,spacestart:spacestart,clues:[]}
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
            return total + num
          });
         }else
         {prevData = 0;}
         currData = 0;
         for (var clue = startPos; clue < clueArray.length; clue++){
          
          currArray = clueArray.map(function(clue,index){
            return index;
          }).slice(startPos,clue+1); 

          currData = clueArray.slice(startPos,clue+1).reduce(function(total,num,index){
            if ((index > 0)&&(!colour)){return total + num +1}else{return total + num}
          });

          if (clue < clueArray.length-1){
           nextData = clueArray.slice(clue+1,clueArray.length).reduce(function(total,num,index){return total + num
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

    identifyBlocks: function(data){
      var results = [];
      var updateInfo = {};
//can we work out what clues the existing blocks are part of?
var cells = data.cells;
// console.log('cells.length'+cells.length)
var playable = this.getPlayable(cells);
// console.log('playable.length'+playable.length)
var cellValues = cells.map(function(cell){
  return cell.autoValue;
});
var firstFilled = cellValues.findIndex(function(currentValue){
  return ((currentValue != 'cross')&&(currentValue != 'clear'))    
});
var unfilled = cellValues.findIndex(function(currentValue){
  return (currentValue === 'clear')    
});
if ((firstFilled > -1)&&(unfilled > -1)){
  var clues = data.clues;
  var clueValues = clues.map(function(clue){
    return clue.number;
  });
  var blockValues = [];
  var blockLength = 0;
  var blockData = {};
  var blockInfo = []
  for (var i = 0; i < cellValues.length; i++){

    if ((cellValues[i] != 'cross')&&(cellValues[i] != 'clear')){
      blockLength += 1;
    }else{
      if (blockLength > 0){
        blockData = {blocklength: blockLength, blockstart: (i - blockLength), blockcolour: cellValues[i-1]};
        blockInfo.push(blockData)
        blockLength = 0;  
      }
    }
  }
  if (blockLength > 0){
    blockData = {blocklength: blockLength, blockstart: (i - blockLength), blockcolour: cellValues[i-1]};
    blockInfo.push(blockData)
    blockLength = 0;  
  }

// if the largest block === the largest clue we can put crosses at
// either end
if (!data.colour){

  var largestClue = clueValues.sort()[clueValues.length-1];

  var largestBlockSize = blockInfo.map(function(block){
    return block.blocklength}).sort()[blockInfo.length-1];

  var largestBlock = blockInfo[blockInfo.findIndex(function(block){
    return block.blocklength === largestBlockSize})];

  if (largestBlockSize === largestClue){

    var crossPos = largestBlock.blockstart-1 
    if ((crossPos >= 0)&&(cells[crossPos].autoValue != 'cross')){
      console.log('updating with cross'+crossPos)
      updateInfo= {row: cells[crossPos].cellRow, col: cells[crossPos].cellCol, fillPattern: 'cross', auto:true, toggle:false}
      results.push(updateInfo);
    }
    crossPos = largestBlock.blockstart+largestBlock.blocklength;
    if  ((crossPos < cells.length)&&(cells[crossPos].autoValue != 'cross')){
      console.log('updating with cross'+crossPos)
      updateInfo= {row: cells[crossPos].cellRow, col: cells[crossPos].cellCol, fillPattern: 'cross', auto:true, toggle:false}
      results.push(updateInfo);
    } 
  }
}

// blocks at start and end can be identified
var startingBlock = blockInfo.findIndex(function(block){
  return block.blockstart === 0});
var firstClue = clues[0];
if (startingBlock > -1){
  for (var i=0; i< firstClue.number;i++){
    if (cells[i].autoValue != firstClue.colour){
      console.log('updating with block colour'+i)
      updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: firstClue.colour, auto:true, toggle:false}
      results.push(updateInfo);
    }
  }
if (cells[firstClue.number+1].autoValue != 'cross'){
  console.log('updating with cross'+firstClue.number+1)
  updateInfo= {row: cells[firstClue.number+1].cellRow, col: cells[firstClue.number+1].cellCol, fillPattern: 'cross', auto:true, toggle:false}
  results.push(updateInfo);
}

}

var endingBlock = blockInfo.findIndex(function(block){
  return block.blockstart+block.blocklength === cells.length});
var lastClue = clues[clues.length -1];
if (endingBlock > -1){
  for (var i=blockInfo[endingBlock].blockstart; i>= cells.length-lastClue.number;i--){
    if (cells[i].autoValue != lastClue.colour){
      console.log('updating with block colour'+i)
      updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: lastClue.colour, auto:true, toggle:false}
      results.push(updateInfo);
    }
  }
if (cells[cells.length-lastClue.number-1].autoValue != 'cross'){
  console.log('update with cross')
  updateInfo= {row: cells[cells.length-lastClue.number-1].cellRow, col: cells[cells.length-lastClue.number-1].cellCol, fillPattern: 'cross', auto:true, toggle:false}
  results.push(updateInfo);
}

}
if (blockInfo.length > 0){
  var firstBlock = blockInfo[0];
  if (firstBlock.blockstart === firstClue.number){
    var startPoint = firstBlock.blockstart - firstClue.number;
    var endPoint = (startPoint+firstBlock.blocklength)
    for (var i= startPoint; i < endPoint; i++){
      if (cells[i].autoValue != 'cross'){
        console.log('update with cross'+i)
        updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: 'cross', auto:true, toggle:false}
        results.push(updateInfo);
      }
    }
  }
}

// if the start position and the clue length are the same, the space
// at (startpoint - cluelength) to (endpoint - cluelength) must be crossed

// if we have more blocks than clues then see if some can be joined 
//together

//for a given block list possibilities for which clue it is.
}
return results;
},

singleClue: function(data){
//find the position of first and last filled cells
var results = [];
var updateInfo = {};
var clue = data.clues[0]; 
var cells = data.cells;
var cellValues = cells.map(function(cell){
  return cell.autoValue;
});
var firstFilled = cellValues.findIndex(function(currentValue){
  return ((currentValue != 'cross')&&(currentValue !='clear'))    
});
if (firstFilled > -1){
  var lastFilled = cellValues.length-1;
  while ((cellValues[lastFilled] ==='clear')||(cellValues[lastFilled]==='cross')){
    lastFilled -= 1 ;
  };
// squares after firstFilled + cluelength -1  must be crossed
//squares before lastFilled - cluelength +1 must be crossed
for (var i=0; i< cells.length; i++){
  if ((i<(lastFilled - clue.number+1))||(i>(firstFilled+clue.number -1))){
    if (cells[i].autoValue !='cross'){
      console.log('single clue updating with cross '+i)
      updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: 'cross', auto:true, toggle:false}
      results.push(updateInfo);
    };
  }
}
}
return results;  
},

edgeProximity: function(data){
  var results = [];
  var updateInfo = {};
  var cells = data.cells;
  var cellValues = cells.map(function(cell){
    return cell.autoValue;
  });
  //firstFilled and last filled should be separate function
  var firstFilled = cellValues.findIndex(function(currentValue){
    return ((currentValue != 'cross')&&(currentValue !='clear'))    
  })
  if (firstFilled > -1){ //no point doing anything if row is clear or full of crosses
    
    var lastFilled = cellValues.length-1;
    while ((cellValues[lastFilled] ==='clear')||(cellValues[lastFilled]==='cross')){
      lastFilled -= 1 ;
    };
    var firstClue = data.clues[0]; 
    var lastClue = data.clues[data.clues.length-1];
    if (firstFilled < firstClue.number){
    //fill in all cells from firstFilled to firstClue
    for (var i=firstFilled+1;i< firstClue.number; i++){
      if (cells[i].autoValue !=firstClue.colour){
        console.log('edge proximity - updating with colour '+i)
        updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: firstClue.colour, auto:true, toggle:false}
        results.push(updateInfo);
      };
    }
  }
  if (cells.length - lastFilled < lastClue.length){
    for (var i=cells.length-lastClue.number; i< lastFilled; i++){
      if (cells[i].autoValue !=firstClue.colour){
        console.log('edge proximity - updating with colour '+i)
        updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: firstClue.colour, auto:true, toggle:false}
        results.push(updateInfo);
      };
    }
  }  
}
return results;  
},

overlap: function(data){
  var results = [];
  var cells = data.cells;
  var clues = data.clues;
  var playable = this.getPlayable(cells);
  var updateInfo = {};
  
  for (var i=0; i< data.cells.length; i++){
    cells[i].testValue1 = -1;
    cells[i].testValue2 = -1;
    cells[i].testColour = 'clear';
  }    
  
  if (clues.length > 0){
  // occasionally you get rows with no clues at all!
  var spaces = this.getDistinctSpaces(playable);
  this.clueDistribution(spaces,clues,data.colour);
  //any spaces with no clues in can be filled in since nothing can go there

  var cellValues = cells.map(function(cell){
    return cell.autoValue;
  })

  for (var i=0; i< spaces.length; i++){
    if(spaces[i].clues.length === 0){
      var spaceStart = spaces[i].spacestart;
      var spaceEnd = spaceStart + spaces[i].spacelength; 
      for (var j=spaceStart; j< spaceEnd; j++){
        if (cells[j].autoValue != 'cross'){
          console.log('overlap - updating with cross '+j)
          updateInfo= {row: cells[j].cellRow, col: cells[j].cellCol, fillPattern: 'cross', auto:true, toggle:false}
          results.push(updateInfo);
        }else{console.log('cross value already set')}
      } 
    }
  }

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
        startpoint = spaces[space].spacestart;
        endpoint = startpoint;
        for (var i=0;i<selectedClues.length;i++){
          endpoint += selectedClues[i].number;
          
          for (var j=startpoint; j<endpoint;j++){
            cells[j].testValue1 = i;
            cells[j].testColour = selectedClues[i].colour;
            cells[j+offset].testColour = selectedClues[i].colour;
            cells[j+offset].testValue2 = i;
            
          }
          startpoint = endpoint;
          if ((i<selectedClues.length-1)&&(!data.colour)){
            cells[startpoint].testValue1 = -1;
            cells[startpoint].testColour = 'cross';
            cells[startpoint + offset].testValue2 = -1;
            cells[startpoint + offset].testColour = 'cross';
            startpoint +=1;
            endpoint+=1;
          }  
        }
      }
    } 
          //now see which cells have both testValues the same
          for (var i=0; i< cells.length;i++){
            if ((cells[i].testValue1 > -1)&&(cells[i].testValue1 === cells[i].testValue2)){
              if (cells[i].autoValue != cells[i].testColour){ 
                console.log('overlap - updating with colour '+i)
                updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: cells[i].testColour, auto:true, toggle:false}
                results.push(updateInfo);
              }else {console.log('value already set'+i)}
            }
          }
          
        }
        return results;
      }
    }

    
    



    module.exports = solvings;
