import Clues from '../models/Clues'

var Rows = function(){
  var results = []
  var row = new Clues({data: [3]});
  results.push(row);
  row = new Clues({data: [3,1]});
  results.push(row);  
  row = new Clues({data: [2,2,1,1]});
  results.push(row);  
  row = new Clues({data: [1,1,1,2,4]});
  results.push(row);  
  row = new Clues({data: [1,6,2,7]});
  results.push(row);  
  row = new Clues({data: [2,6,3]});
  results.push(row);  
  row = new Clues({data: [10,1]});
  results.push(row);  
  row = new Clues({data: [4]});
  results.push(row);  
  row = new Clues({data: [4]});
  results.push(row);  
  row = new Clues({data: [8]});
  results.push(row);  
  row = new Clues({data: [1,2,2]});
  results.push(row);  
  row = new Clues({data: [1,6,2]});
  results.push(row);  
  row = new Clues({data: [1,1,2,1]});
  results.push(row);  
  row = new Clues({data: [2,1,2,2]});
  results.push(row);  
  row = new Clues({data: [4,5]});
  results.push(row);  

  return results;
}

module.exports = Rows;