var solvings = {

  overallClueLength: function(clues){
  var runningTotal = 0;
  if (clues.length === 0) return runningTotal;
  for (var i = 0; i< clues.length; i++){
    runningTotal += clues[i].number;
    if ((i > 0)&&(clues[i-1].colour === clues[i].colour)){
        runningTotal += 1;
      }
    }
  return runningTotal;
  },

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


cluesWillFit: function(spaces,clues,colour){
  //will the provided clues fit in the provided spaces
  var result = true;
  if (clues.length === 0) {return result};
  if ((spaces.length ===0)&&(clues.length > 0)){return false}
  var spaceValues = spaces.map(function(space){
    return space.spacelength;
  });
  var clueValues = clues.map(function(clue){
    return clue.number;
  });
  var spaceLength =0;
  var clueLength = 0;
  if (spaceValues.length > 0){
    spaceLength = spaceValues.reduce(function(total,num){
      return total+num;})
  };
  if (clueValues.length > 0){
    clueLength = clueValues.reduce(function(total,num){
        return total+num;})
  };

  if (spaceLength >= clueLength){
      //only concerned with first legal arrangement
      var spaceNo=0;
      var spaceLeft = spaceValues[0];
      var finished;
      for (var i = 0; i< clueValues.length;i++){
        // console.log('looking at clue '+i)
        // console.log(clueValues[i])
        finished = false;
        while (!finished){
        // console.log('not finished')
        // for each clue, will it fit? yes, reduce spaceLeft, no, increment spaceNo
        if (clueValues[i]<=spaceLeft){
        // console.log('fits')
        //it fits. reduce remaining space;
        if (!colour){
        spaceLeft -= clueValues[i]+1;
        }else{
          //coloured puzzle - only add 1 if colours are the same
          spaceLeft -= clueValues[i]
          if ((i<clueValues.length-1)&&(clues[i].colour === clues[i+1].colour)){
            // console.log('extra space removed because colours are the same')
            spaceLeft -= 1}
          }
        finished = true;
        } else{
        // console.log('doesnt fit')
        //it doesn't fit.
        //move to next space if there is one
        if (spaceNo < spaceValues.length - 1){
          spaceNo += 1;
          // console.log('move to space '+spaceNo)
          spaceLeft = spaceValues[spaceNo];
          }else{
          // console.log('no spaces left')
          result =  false;
          finished = true;
          }
        }
      }

      }
    } else result = false;
  // if (result === true){
  //   console.log(clueValues+' fits into '+spaceValues);
  // } else {console.log(clueValues+' does not fit into '+spaceValues);}
  return result;
},

clueDistribution: function(spaces,clues,colour){
  var previousSpace = [];
  var previousData = [];
  var currentSpace = [];
  var currentData =[];
  var remainingData = [];
  var remainingSpace = [];
  var currentSpaceLength;
  var currentDataLength;
  var done = false;
  var currentData  =[];
  var offsetClueID = 0;
  var offsetClue = null;

  for (var space = 0; space < spaces.length; space++){
    currentSpace = spaces.slice(space,space+1);

    if (space < spaces.length -1){
      remainingSpace = spaces.slice(space+1,spaces.length);
    } else remainingSpace = [];

    if (space > 0){
      previousSpace = spaces.slice(0,space);
    } else previousSpace = [];

    currentSpaceLength = currentSpace[0].spacelength;

    for (var offset = 0;offset < clues.length;offset++){
    currentDataLength = 0;
    previousData = [];
    currentData = [];
    remainingData = [];

    for (var i=0; i<offset;i++){
      previousData.push(clues[i])
    }

    for (var i=offset; i<clues.length; i++){
      currentData.push(clues[i])
      }


    done = false;
    while (!done){
      currentDataLength = this.overallClueLength(currentData);

      if (this.cluesWillFit(remainingSpace,remainingData,colour)&&(this.cluesWillFit(previousSpace,previousData,colour))){
      if (currentDataLength <= currentSpaceLength){
        for (var i = 0; i< currentData.length; i++){
          offsetClueID = i+offset;
          offsetClue = clues[offsetClueID];
          if (spaces[space].clues.indexOf(offsetClue) === -1){
                spaces[space].clues.push(offsetClue);}
            }
          }
        remainingData.unshift(currentData.pop());
        if (currentData.length === 0){done = true}
      }else{
      done = true;
      }
    }
  }
  //end second loop
  }
return spaces;
},

identifyBlocks: function(data){
var results = [];
var updateInfo = {};
//can we work out what clues the existing blocks are part of?
var cells = data.cells;
// console.log('cells.length'+cells.length)
// var playable = this.getPlayable(cells);
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
  var updateInfo = {};

  for (var i=0; i< data.cells.length; i++){
    cells[i].testValue1 = -1;
    cells[i].testValue2 = -1;
    cells[i].testColour = 'clear';
  }

  if (clues.length > 0){
  // occasionally you get rows with no clues at all!
  var spaces = this.getDistinctSpaces(cells);
  this.clueDistribution(spaces,clues,data.colour);

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
        if (spaces[j].clues.indexOf(clues[i]) > -1){
          count +=1;
        }
      }
      if (count > 1){
        console.log('multiple instances')
        //remove all instances of that clue from spaces
        for (var j = 0; j < spaces.length; j++){
          index = spaces[j].clues.indexOf(clues[i]);
          if (index>-1){
            console.log('removing multiples')
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
    var selectedClues =[];
    var myClues = clues;
    var clueNumber;
    console.log('looking at spaces')
    for (var space = 0; space < spaces.length;space++){
    totalLength = this.overallClueLength(spaces[space].clues);
    console.log('total length '+totalLength)
    if (totalLength > (spaces[space].spacelength)/2){
      offset = spaces[space].spacelength - totalLength;
      startpoint = spaces[space].spacestart;
      endpoint = startpoint;
      console.log('offset '+offset)
      console.log('start '+startpoint);
      console.log(selectedClues)
      for (var i=0;i<spaces[space].clues.length;i++){
        endpoint += spaces[space].clues[i].number;
        console.log('end '+endpoint)
          for (var j=startpoint; j<endpoint;j++){
            cells[j].testValue1 = i;
            cells[j].testColour = spaces[space].clues[i].colour;
            cells[j+offset].testColour = spaces[space].clues[i].colour;
            cells[j+offset].testValue2 = i;
          }
        startpoint = endpoint;
        console.log(endpoint)
        if ((i<spaces[space].clues.length-1)&&(spaces[space].clues[i].colour === spaces[space].clues[i+1].colour)){
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

        return results;
      }
    }
    }






    module.exports = solvings;
