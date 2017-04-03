var solvings = {

  getLargestClue: function(clues){
    if (clues.length === 0){return null}
    var unsolved = clues.map(function(clue){
        if (clue.solved === -1){return clue.number}else{return 0}
      });
    var largestClueLength = unsolved.sort()[clues.length-1];
    var largestClueId = clues.findIndex(function(clue){
      return clue.number === largestClueLength;
    });
    var largestClue = clues[largestClueId]
    return largestClue;
  },

  getLastFreeCell: function(cells){
  var i = cells.length-1;
  var lastFreeFound = false;
    while (!lastFreeFound){
    if (i>0){
    if (cells[i].autoValue==='cross'){
        i--
        } else {
        lastFreeFound = true;
        }
      }else {lastFreeFound = true}
    }
  return i;
  },

  layoutIsLegal: function(test,ref){
    var lengthOfArray;
    var isLegal = true;
    if ((test.length > 0)&&(ref.length > 0)){
      if (test.length > ref.length){
        lengthOfArray = test.length;
      } else {
        lengthOfArray = ref.length;
      }
    for (var i = 0; i< lengthOfArray; i++){
      if ((i < test.length)&&(i < ref.length)){
      // if test is a cross the other must be a cross or clear
      // if test is filled the other must be filled or clear
      if (test[i] != ref[i]){
        if (test[i] === 'cross'){
          if ((ref[i] != 'cross')&&(ref[i] != 'space')){
            isLegal = false;
            }
          }
        else if (test[i] !='space'){
          if (ref[i] === 'cross'){isLegal = false}
          }
        }
      } else {
      //we're off the end. Just check the longer array doesn't have any filled blocks
      if (i > test.length){
        if ((ref[i] != 'cross')&&(ref[i] != 'clear')){isLegal = false}
        } else
        {
        if ((test[i] != 'cross')&&(test[i] != 'clear')){isLegal = false}
        }
      }
      }
    }
  return isLegal;
  },

  getBlockInfo: function(data){
    var blockValues = [];
    var blockLength = 0;
    var blockData = {};
    var blockInfo = []
    for (var i = 0; i < data.cells.length; i++){
      //nb - does not work for coloured puzzles at the moment
      if ((data.cells[i].autoValue != 'cross')&&(data.cells[i].autoValue != 'clear')){
        blockLength += 1;
      }else{
        if (blockLength > 0){
          blockData = {blocklength: blockLength, blockstart: (i - blockLength), blockcolour: data.cells[i-1].autoValue, clues:[]};
          blockInfo.push(blockData)
          blockLength = 0;
        }
      }
    }
    if (blockLength > 0){
      blockData = {blocklength: blockLength, blockstart: (i - blockLength), blockcolour: data.cells[i-1].autoValue, clues: []};
      blockInfo.push(blockData)
      blockLength = 0;
    }
  return blockInfo;
  },

  largestBlockEqualsLargestClue: function(data){
      var largestClue = this.getLargestClue(data.clues);
      var blockInfo = this.getBlockInfo(data);
      var largestBlockSize = blockInfo.map(function(block){
        return block.blocklength}).sort()[blockInfo.length-1];

      var largestBlock = blockInfo[blockInfo.findIndex(function(block){
        return block.blocklength === largestBlockSize})];

      if (largestBlockSize === largestClue.number){
        return largestBlock;
      }else{
        return null;
      }
  },

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


blocksMapToClues: function(spaces,blocks,clues,cells){
var dataLength = this.getLastFreeCell(cells);
if (blocks.length === 0){return 0}
var clueLength = this.overallClueLength(clues);
var range = dataLength - clueLength+1;
var clueStart;
var clueEnd;
var blockStart;
var blockEnd;
var maxBlockStart = blocks[0].blockstart; //must be <= start of 1st block
var minBlockEnd = blocks[blocks.length - 1].blockstart + blocks[blocks.length - 1].blocklength - 1; //must be >= end of last block
var addClue;
var clueId;
var blockAlreadyIdentified;
console.log('min block end '+minBlockEnd);
console.log('max block start '+maxBlockStart);
for (var i = 0; i< blocks.length; i++){
  blockAlreadyIdentified = false;
  blockStart = blocks[i].blockstart;
  blockEnd = blocks[i].blockstart + blocks[i].blocklength - 1;
  console.log('block start '+blockStart)
  console.log('block end '+blockEnd)
  console.log('range is '+range)

  clueEnd = 0;
  clueStart=0;
  for (var clue = 0; clue < clues.length;clue++){
    addClue = true;
    clueId = clues[clue].solved;
    if (clueId > -1){
      if (clueId === blockStart){
        console.log('this block is already known to be '+clue);
        blocks[i].clues.splice(0,blocks[i].clues.length,clues[clue]);
        blockAlreadyIdentified = true;
        addClue = false;
      }else{
        console.log('this clue is already known to be a different block')
        addClue = false;
      }
    }
    clueEnd = clueStart + clues[clue].number - 1;

    if ((clues[clue].number < blocks[i].blocklength)&&(addClue === true)){
      addClue = false
      console.log('length of clue less than length of block')
    }
    if ((blockEnd - clueEnd > range)&&(addClue === true)){
      addClue = false
      console.log('out of range')
    }
    if ((clueStart > blockStart)&&(addClue === true)){
      addClue = false
      console.log('clue cant be moved back far enough to match this block')
    }
    if ((clue === 0)&&((blockStart - clues[clue].number + 1) > maxBlockStart)&&(addClue === true)){
      addClue = false
      console.log('clue is not allowed to start after '+maxBlockStart)
    }
    if ((clue === clues.length - 1)&&(blockEnd+clues[clue].number-1 < minBlockEnd)&&(addClue === true)){
      addClue = false
      console.log('clue is not allowed to end before '+minBlockEnd)
    }
      if (addClue === true){
        console.log('adding clue '+clue+' to block '+i)
        blocks[i].clues.push(clues[clue])
      }

    if ((clue < clues.length - 1)&&(clues[clue].colour === clues[clue+1].colour)){clueEnd+=1}
    clueStart = clueEnd+1;
    };
  };
console.log(blocks)
},

cluesWillFit: function(spaces,clues,colour,blocks){
  //will the provided clues fit in the provided spaces
  var result = true;
  clueLength = this.overallClueLength(clues);
  if ((spaces.length ===0)&&(clueLength > 0)){return false}

  var spaceValues = spaces.map(function(space){
    return space.spacelength;
  });
  var clueValues = clues.map(function(clue){
    return clue.number;
  });

  var spaceLength =0;
  var clueLength = 0;
  if (spaces.length > 0){
    spaceLength = spaceValues.reduce(function(total,num){
      return total+num;})
  };


  if (spaceLength >= clueLength){
      //only concerned with first legal arrangement
      var spaceNo=0;
      var spaceLeft = spaceValues[spaceNo];
      var finished;
      var spaceEnd;
      if ((clues.length === 0)&&(blocks.length > 0)){
        if (spaces.length > 0){
        //ok, is there a block between in this space? if so it MUST fail
          for (var blockNo = 0;blockNo < blocks.length;blockNo++){
            if ((blocks[blockNo].blockstart >= spaces[spaceNo].spacestart)
            &&(blocks[blockNo].blockstart)<(spaces[spaceNo].spacestart + spaces[spaceNo].spacelength)){
            result = false;
            }
          }
        }
      }
      for (var i = 0; i< clueValues.length;i++){
        finished = false;
        while (!finished){
        if (clueValues[i]<=spaceLeft){
        if (!colour){
        spaceLeft -= clueValues[i]+1;
        }else{
          spaceLeft -= clueValues[i]
          if ((i<clueValues.length-1)&&(clues[i].colour === clues[i+1].colour)){
            spaceLeft -= 1}
          }
        finished = true;
        } else{
        if (spaceNo < spaceValues.length - 1){
          spaceNo += 1;
          spaceLeft = spaceValues[spaceNo];
          }else{
            result =  false;
            finished = true;
            }
          }
        }
      }
    } else result = false;
  return result;
},

clueDistribution: function(spaces,clues,colour,blocks){
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
      if (this.cluesWillFit(remainingSpace,remainingData,colour,blocks)){
        if (this.cluesWillFit(previousSpace,previousData,colour,blocks)){
          if (currentDataLength <= currentSpaceLength){
            for (var i = 0; i< currentData.length; i++){
              offsetClueID = i+offset;
              offsetClue = clues[offsetClueID];
              if (spaces[space].clues.indexOf(offsetClue) === -1){
              spaces[space].clues.push(offsetClue)}
              }
            }
          }
        }
      remainingData.unshift(currentData.pop());
      if (currentData.length === 0){done = true}
      }
    }
  //end second loop
  }
return spaces;
},

//solving techniques:

identifyBlocks: function(data){
var thisBlock;
var nextBlock;
var results = [];
var updateInfo = {};
var blockInfo = this.getBlockInfo(data);
var spaceDist = this.getDistinctSpaces(data.cells)
var fillStart;
var fillEnd;
var fillColour;
var startCrossPos;
var endCrossPos;
var clueId;
var cluePos;
var skipNext=0;
var blockProcessed = false;

if (blockInfo.length > 0){
  this.blocksMapToClues(spaceDist,blockInfo,data.clues,data.cells);
  for (var bl = 0; bl < blockInfo.length; bl ++){
    if (skipNext === 0){
      blockProcessed = false;
      thisBlock = blockInfo[bl];
      if (bl < blockInfo.length-1){
        nextBlock = blockInfo[bl + 1];
      } else {
        nextBlock = null;
      }
    console.log('Block number '+bl)
    console.log(thisBlock);
    console.log(nextBlock)
    fillStart = -1;
    fillEnd = -1;
    fillColour = 'clear'
    startCrossPos = -1;
    endCrossPos = -1;
    clueId = -1;
    cluePos = -1;

    //Single clues: Step 1: See if the next block has the same clue
    if (thisBlock.clues.length === 1){
      //probably should scan to catch all with same clue. This only catches 2
      console.log('single clue on block '+bl)
      if ((nextBlock != null)&&(nextBlock.clues.length === 1)){
        console.log('single clue on following block')

        if (thisBlock.clues[0] === nextBlock.clues[0]){
          console.log('split clue detected')
          fillStart = thisBlock.blockstart+thisBlock.blocklength;
          fillEnd = nextBlock.blockstart;
          fillColour = thisBlock.clues[0].colour;
          if (nextBlock.blockstart+nextBlock.blocklength - thisBlock.blockstart === thisBlock.clues[0].number){
            startCrossPos = thisBlock.blockstart -1;
            endCrossPos = nextBlock.blockstart+nextBlock.blocklength;
            clueId = data.clues.indexOf(thisBlock.clues[0]);
            cluePos = thisBlock.blockstart;
            }
          skipNext = 1;
          blockProcessed = true;
          };

        if ((blockProcessed === false)&&(data.clues.indexOf(nextBlock.clues[0]) - data.clues.indexOf(thisBlock.clues[0])===1)){
          //next block identified
          //check limits
          console.log('following clue identified but not same as current')
          fillStart = thisBlock.blockstart+thisBlock.clues[0].number;
          fillEnd = nextBlock.blockstart+nextBlock.blocklength - nextBlock.clues[0].number;
          fillColour = 'cross'
          blockProcessed = true;
          };
        };

      if (blockProcessed === false){
        //next block not identified or non existent
        console.log('next block not identified')
        if (thisBlock.blocklength === thisBlock.clues[0].number){
          fillStart = thisBlock.blockstart;
          fillEnd = thisBlock.blockstart+1;
          fillColour = thisBlock.clues[0].colour;
          startCrossPos = thisBlock.blockstart -1;
          endCrossPos = thisBlock.blockstart+thisBlock.blocklength;
          clueId = data.clues.indexOf(thisBlock.clues[0]);
          cluePos = thisBlock.blockstart;
          }
        }
      }; //single clue associated with this block

    if (blockProcessed === false){
      //block is not identified at all. See if we can identify it.
    }


    if ((fillStart > -1)&&(fillEnd > -1)&&(fillEnd > fillStart)){
    if (clueId > -1){
      console.log('clue Id is '+clueId+' at position '+cluePos)
      }
    if ((startCrossPos > -1)&&(data.cells[startCrossPos].autoValue != 'cross')){
      console.log('adding start cross at '+startCrossPos)
      updateInfo= {row: data.cells[startCrossPos].cellRow, col: data.cells[startCrossPos].cellCol, fillPattern: 'cross', auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
      results.push(updateInfo);
      }
    for (var j = fillStart; j< fillEnd; j++){
      if (data.cells[j] != fillColour){
        console.log('filling with '+fillColour+' at '+j)
        updateInfo= {row: data.cells[j].cellRow, col: data.cells[j].cellCol, fillPattern: fillColour, auto:true, toggle:false, isRow:data.row, clue: clueId, cluePos: cluePos}
        results.push(updateInfo);
        }
      }
    if ((endCrossPos > -1)&&(endCrossPos<data.cells.length)&&(data.cells[endCrossPos].autoValue != 'cross')){
      console.log('adding end cross at '+endCrossPos)
      updateInfo= {row: data.cells[endCrossPos].cellRow, col: data.cells[endCrossPos].cellCol, fillPattern: 'cross', auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
      results.push(updateInfo);
      }
    }
  } else {
  console.log('skip next');
  skipNext -=1;
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
      updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: 'cross', auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
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
        updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: firstClue.colour, auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
        results.push(updateInfo);
      };
    }
  }
  if (cells.length - lastFilled < lastClue.length){
    for (var i=cells.length-lastClue.number; i< lastFilled; i++){
      if (cells[i].autoValue !=firstClue.colour){
        console.log('edge proximity - updating with colour '+i)
        updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: firstClue.colour, auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
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
  var updateInfo = {};
  var blockInfo = this.getBlockInfo(data)

  for (var i=0; i< data.cells.length; i++){
    cells[i].testValue1 = -1;
    cells[i].testValue2 = -1;
    cells[i].testColour = 'clear';
  }

  if (data.clues.length > 0){
  // occasionally you get rows with no clues at all!
  var spaces = this.getDistinctSpaces(cells);
  this.clueDistribution(spaces,data.clues,data.colour,blockInfo);

  //first, if a space has no clues at all it *must* be filled with crosses
  for (var i=0; i< spaces.length; i++){
    if(spaces[i].clues.length === 0){
      var spaceStart = spaces[i].spacestart;
      var spaceEnd = spaceStart + spaces[i].spacelength;
      for (var j=spaceStart; j< spaceEnd; j++){
        if (cells[j].autoValue != 'cross'){
          console.log('overlap - updating with cross '+j)
          updateInfo= {row: cells[j].cellRow, col: cells[j].cellCol, fillPattern: 'cross', auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
          results.push(updateInfo);
        }else{console.log('cross value already set')}
      }
    }
  }

  var count;
  var index;
  for (var i=0;i<data.clues.length;i++){
      count = 0;
      for (var j = 0; j < spaces.length; j++){
        if (spaces[j].clues.indexOf(data.clues[i]) > -1){
          count +=1;
        }
      }
      if (count > 1){
        for (var j = 0; j < spaces.length; j++){
          index = spaces[j].clues.indexOf(data.clues[i]);
          if (index>-1){
            spaces[j].clues.splice(index,1)}
          }
        }
      }
    //now each space will contain clues that can't be anywhere else
    var offset=0;
    var startpoint=0;
    var endpoint=0;
    var totalLength;
    var clueLengths;
    var selectedClues =[];
    var myClues = data.clues;
    var clueNumber;
    for (var space = 0; space < spaces.length;space++){

    totalLength = this.overallClueLength(spaces[space].clues);
    if (totalLength > (spaces[space].spacelength)/2){
      offset = spaces[space].spacelength - totalLength;
      startpoint = spaces[space].spacestart;
      endpoint = startpoint;
      for (var i=0;i<spaces[space].clues.length;i++){
        endpoint += spaces[space].clues[i].number;
          for (var j=startpoint; j<endpoint;j++){
            cells[j].testValue1 = i;
            cells[j].testColour = spaces[space].clues[i].colour;
            cells[j+offset].testColour = spaces[space].clues[i].colour;
            cells[j+offset].testValue2 = i;
          }
        startpoint = endpoint;
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
                updateInfo= {row: cells[i].cellRow, col: cells[i].cellCol, fillPattern: cells[i].testColour, auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
                results.push(updateInfo);
              }else {console.log('value already set'+i)}
            }
          }

        return results;
      }
    }
    }






    module.exports = solvings;
