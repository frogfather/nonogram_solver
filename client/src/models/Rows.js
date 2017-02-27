import Clues from '../models/Clues'

var Rows = function(){
  var results = []
  var row = new Clues({id:0, colour: 'black', data: [3]});
  results.push(row);
  row = new Clues({id:1, colour: 'black',data: [3,1]});
  results.push(row);  
  row = new Clues({id:2, colour: 'black',data: [2,2,1,1]});
  results.push(row);  
  row = new Clues({id:3, colour: 'black',data: [1,1,1,2,4]});
  results.push(row);  
  row = new Clues({id:4, colour: 'black',data: [1,6,2,7]});
  results.push(row);  
  row = new Clues({id:5, colour: 'black',data: [2,6,3]});
  results.push(row);  
  row = new Clues({id:6, colour: 'black',data: [10,1]});
  results.push(row);  
  row = new Clues({id:7, colour: 'black',id:0, colour: 'black',data: [4]});
  results.push(row);  
  row = new Clues({id:8, colour: 'black',data: [4]});
  results.push(row);  
  row = new Clues({id:9, colour: 'black',data: [8]});
  results.push(row);  
  row = new Clues({id:10, colour: 'black',data: [1,2,2]});
  results.push(row);  
  row = new Clues({id:11, colour: 'black',data: [1,6,2]});
  results.push(row);  
  row = new Clues({id:12, colour: 'black',data: [1,1,2,1]});
  results.push(row);  
  row = new Clues({id:13, colour: 'black',data: [2,1,2,2]});
  results.push(row);  
  row = new Clues({id:14, colour: 'black',data: [4,5]});
  results.push(row);  

  return results;
}

module.exports = Rows;