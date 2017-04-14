var solvings = {

  compareArrays: function(array1, array2){
    var noDifference = true;
    if (array1.length != array2.length){return false}
    for (var i = 0; i< array1.length; i++){
      if (array1[i] != array2[i]){noDifference = false}
    }
  return noDifference;
  },

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

  getFirstFreeCell: function(cells){
    var i = 0;
    var firstFreeFound = false;
      while (!firstFreeFound){
      if (i< cells.length){
      if (cells[i].autoValue==='cross'){
          i++
          } else {
          firstFreeFound = true;
          }
        }else {firstFreeFound = true}
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

getSpaceRound: function(cells, startPosition, before){
  if ((cells.length > 0)&&(startPosition < cells.length)){
    var cellNo = startPosition;
    var found = false;
    var counter = 0;
    while (!found){
      if (before === true){
        console.log('counting back from start point '+startPosition)
        if (cellNo > 0){
          cellNo --
        } else {found = true}
      }else{
        console.log('counting forward from start point '+startPosition)
        if (cellNo < cells.length-1){
          cellNo ++
        } else {found = true}
      }
    if (found === false){
      if (cells[cellNo].autoValue==='clear'){
        counter ++;
        }else{
        found = true
        }
      }
    }
  }
return counter;
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
for (var i = 0; i< blocks.length; i++){
  blockAlreadyIdentified = false;
  blockStart = blocks[i].blockstart;
  blockEnd = blocks[i].blockstart + blocks[i].blocklength - 1;
  clueEnd = 0;
  clueStart=this.getFirstFreeCell(cells);
  for (var clue = 0; clue < clues.length;clue++){
    addClue = true;
    clueId = clues[clue].solved;
    if (clueId > -1){
      if (clueId === blockStart){
        // console.log('this block is already known to be '+clue);
        blocks[i].clues.splice(0,blocks[i].clues.length,clues[clue]);
        blockAlreadyIdentified = true;
        addClue = false;
      }else{
        addClue = false;
      }
    }
    clueEnd = clueStart + clues[clue].number - 1;



    if ((clues[clue].number < blocks[i].blocklength)&&(addClue === true)){
      addClue = false
    }
    if ((blockEnd - clueEnd > range)&&(addClue === true)){
      addClue = false
    }
    if ((clueStart > blockStart)&&(addClue === true)){
      addClue = false
    }
    if ((clue === 0)&&((blockStart - clues[clue].number + 1) > maxBlockStart)&&(addClue === true)){
      addClue = false
    }
    if ((clue === clues.length - 1)&&(blockEnd+clues[clue].number-1 < minBlockEnd)&&(addClue === true)){
      addClue = false
    }
      if (addClue === true){
        blocks[i].clues.push(clues[clue])
      }
    if ((clue < clues.length - 1)&&(clues[clue].colour === clues[clue+1].colour)){clueEnd+=1}
    clueStart = clueEnd+1;
    };
  };
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
var prevBlock;
var results = [];
var updateInfo = {};
var blockInfo = this.getBlockInfo(data);
var spaceDist = this.getDistinctSpaces(data.cells)
var fillStart;
var fillEnd;
var fillColour;
var fillCrossStart;
var fillCrossEnd;
var startCrossPos;
var endCrossPos;
var clueId;
var cluePos;
var skipNext=0;
var blockProcessed = false;
var spaceBefore;
var spaceAfter;
var spaceBetween;
var difference;

if (data.clues.length > 0){
  var allSolved = true;
  //quick check to see if all are identified
  for (var i=0; i< data.clues.length;i++){
    if (data.clues[i].solved === -1){allSolved = false}
  }
if (allSolved === true){
  //fill in any clear spaces
  //we can just specify the full length of the cells and the update method will deal with already filled spaces
  fillCrossStart = 0;
  fillCrossEnd = data.cells.length -1;
  console.log('all clues solved - checking for any unfilled cells')
  }
}

if (blockInfo.length > 0){
  this.blocksMapToClues(spaceDist,blockInfo,data.clues,data.cells);
  for (var bl = 0; bl < blockInfo.length; bl ++){
    if (skipNext === 0){
    if (allSolved === false){
      blockProcessed = false;
      thisBlock = blockInfo[bl];
      if (bl > 0 ){
        prevBlock = blockInfo[bl - 1];
        }else{
          prevBlock = null
        }
      if (bl < blockInfo.length-1){
        nextBlock = blockInfo[bl + 1];
        } else {
        nextBlock = null;
        }
    fillStart = -1;
    fillEnd = -1;
    fillColour = 'clear'
    fillCrossStart = -1;
    fillCrossEnd = -1;
    startCrossPos = -1;
    endCrossPos = -1;
    clueId = -1;
    cluePos = -1;
    }

    //Single clues: Step 1: See if the next block has the same clue
    if ((allSolved === false)&&(thisBlock.clues.length === 1)){
      console.log('only one clue')

      if (thisBlock.clues[0].solved != -1){
        console.log('block is already identified');
        //add the leading and trailing crosses where appropriate
        if ((nextBlock != null)&&(nextBlock.clues.length === 1)&&(thisBlock.clues[0].colour === nextBlock.clues[0].colour)){
          startCrossPos = thisBlock.blockstart - 1;
          endCrossPos = thisBlock.blockstart+thisBlock.blocklength;
        }
        blockProcessed = true
      }

      if ((blockProcessed === false)&&(thisBlock.blocklength === thisBlock.clues[0].number)){
        clueId = data.clues.indexOf(thisBlock.clues[0]);
        cluePos = thisBlock.blockstart;
        console.log('block is clue '+clueId)
        fillStart = thisBlock.blockstart;
        fillEnd = thisBlock.blockstart+1;
        fillColour = thisBlock.clues[0].colour;
        startCrossPos = thisBlock.blockstart - 1;
        endCrossPos = thisBlock.blockstart+thisBlock.blocklength;

      }

      if((blockProcessed === false)&&(prevBlock === null)&&(data.clues.indexOf(thisBlock.clues[0])===0)){
        console.log('this is the first block')
        //first block.
        spaceBefore = this.getSpaceRound(data.cells,thisBlock.blockstart, true);
        console.log('first block: space before is '+spaceBefore);
        difference = thisBlock.clues[0].number - spaceBefore - thisBlock.blocklength;
        if (difference < 0){
          console.log('need to cross out first '+difference+' spaces ')
          fillEnd = thisBlock.blockstart+thisBlock.blocklength - thisBlock.clues[0].number;
          fillStart = fillEnd + difference;
          fillColour = 'cross'
        }else if (difference > 0){
          console.log('need to extend block by '+difference+ 'spaces ')
          fillStart = thisBlock.blockstart+thisBlock.blocklength;
          fillEnd = fillStart + difference;
          fillColour = thisBlock.clues[0].colour;
          if (fillEnd - thisBlock.blockstart === thisBlock.clues[0].number){
            startCrossPos = thisBlock.blockstart - 1;
            endCrossPos = fillEnd;
            clueId = data.clues.indexOf(thisBlock.clues[0]);
            cluePos = thisBlock.blockstart;
          }
        }
      blockProcessed = true;
      }
      if ((nextBlock != null)&&(nextBlock.clues.length === 1)){

        if ((blockProcessed === false)&&(thisBlock.clues[0] === nextBlock.clues[0])){
          //this needs altered to cope with clues split over more than two blocks
          console.log('split clue detected')
          var splitBlockCount =1;
          var done = false;
          while (!done){
            if ((bl + splitBlockCount + 1 < blockInfo.length)&&(blockInfo[bl + splitBlockCount + 1].clues.length === 1)&&(blockInfo[bl + splitBlockCount + 1].clues[0] === thisBlock.clues[0])){
              splitBlockCount += 1;
              } else {
              done = true;
              }
            }
          fillStart = thisBlock.blockstart+thisBlock.blocklength;
          fillEnd = blockInfo[bl + splitBlockCount].blockstart;
          fillColour = thisBlock.clues[0].colour;
          if (blockInfo[bl + splitBlockCount].blockstart+ blockInfo[bl + splitBlockCount].blocklength - thisBlock.blockstart === thisBlock.clues[0].number){
            //shouldn't happen with coloured puzzles unless adjacent clues are same colour;
            startCrossPos = thisBlock.blockstart -1;
            endCrossPos = nextBlock.blockstart+nextBlock.blocklength;
            clueId = data.clues.indexOf(thisBlock.clues[0]);
            cluePos = thisBlock.blockstart;
            }
          skipNext = splitBlockCount;
          blockProcessed = true;
          };



        if ((blockProcessed === false)&&(data.clues.indexOf(nextBlock.clues[0]) - data.clues.indexOf(thisBlock.clues[0])===1)){
          //next block identified and the next clue to this one
          //check limits
          console.log('clue on following block is the next in sequence')
          // this is ok because these are cells that cannot be ANY colour
          //need different variable names
          fillCrossStart = thisBlock.blockstart+thisBlock.clues[0].number;
          fillCrossEnd = nextBlock.blockstart+nextBlock.blocklength - nextBlock.clues[0].number;
          spaceBetween = nextBlock.blockstart - (thisBlock.blockstart + thisBlock.blocklength);
          console.log('space between blocks is '+spaceBetween)
          if (thisBlock.blocklength === thisBlock.clues[0].number){
            clueId = data.clues.indexOf(thisBlock.clues[0]);
            cluePos = fillStart;
            }
          blockProcessed = true;
          };
        };

      if (blockProcessed === false){
        if (thisBlock.blocklength === thisBlock.clues[0].number){
          fillStart = thisBlock.blockstart;
          fillEnd = thisBlock.blockstart+1;
          fillColour = thisBlock.clues[0].colour;
          //this will depend on colour of nearby clues
          startCrossPos = thisBlock.blockstart -1;
          endCrossPos = thisBlock.blockstart+thisBlock.blocklength;
          clueId = data.clues.indexOf(thisBlock.clues[0]);
          cluePos = thisBlock.blockstart;
          blockProcessed = true;
          }
        if (blockProcessed === false){
          spaceAfter = this.getSpaceRound(data.cells,thisBlock.blockstart+thisBlock.blocklength -1, false);
          if ((nextBlock === null)&&(thisBlock.clues[0] === data.clues[data.clues.length - 1])){
            //needs to be last block and last clue
            difference = thisBlock.clues[0].number - thisBlock.blocklength - spaceAfter;
            if (difference < 0){
              fillStart = thisBlock.blockstart + thisBlock.clues[0].number;
              fillEnd = fillStart - difference;
              fillColour = 'cross'
              }else if (difference > 0){
              fillStart = thisBlock.blockstart - difference;
              fillEnd = thisBlock.blockstart;
              fillColour = thisBlock.clues[0].colour;
              if (thisBlock.blocklength + difference === thisBlock.clues[0].number){
                clueId = data.clues.indexOf(thisBlock.clues[0]);
                cluePos = fillStart
                //this is the last clue and last block so that's fine
                startCrossPos = fillStart - 1;
                endCrossPos = thisBlock.blockstart+thisBlock.blocklength;
                }
              }
            }
          }
        }
      };

    if ((fillCrossEnd > -1)&&(fillCrossStart > -1)&&(fillCrossEnd > fillCrossStart)){
      if (clueId > -1){
      }

      for (var j = fillCrossStart; j< fillCrossEnd; j++){
        if (data.cells[j] != 'cross'){
          updateInfo= {row: data.cells[j].cellRow, col: data.cells[j].cellCol, fillPattern: 'cross', auto:true, toggle:false, isRow:data.row, clue: clueId, cluePos: cluePos}
          results.push(updateInfo);
          }
        }
    }

    if ((startCrossPos > -1)&&(data.cells[startCrossPos].autoValue != 'cross')){
      updateInfo= {row: data.cells[startCrossPos].cellRow, col: data.cells[startCrossPos].cellCol, fillPattern: 'cross', auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
      results.push(updateInfo);
      }

    if ((fillStart > -1)&&(fillEnd > -1)&&(fillEnd > fillStart)){
    if (clueId > -1){
      }
    for (var j = fillStart; j< fillEnd; j++){
      if (data.cells[j] != fillColour){
        updateInfo= {row: data.cells[j].cellRow, col: data.cells[j].cellCol, fillPattern: fillColour, auto:true, toggle:false, isRow:data.row, clue: clueId, cluePos: cluePos}
        results.push(updateInfo);
        }
      }
    }

    if ((endCrossPos > -1)&&(endCrossPos<data.cells.length)&&(data.cells[endCrossPos].autoValue != 'cross')){
      updateInfo= {row: data.cells[endCrossPos].cellRow, col: data.cells[endCrossPos].cellCol, fillPattern: 'cross', auto:true, toggle:false, isRow:data.row, clue:-1, cluePos:-1}
      results.push(updateInfo);
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
              }
            }
          }

        return results;
      }
    }
    }






    module.exports = solvings;
