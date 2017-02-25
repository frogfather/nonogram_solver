import Clues from '../models/Clues'

var Cols = function(){
  var results = []
  var col = new Clues({id:0, colour: 'black', data: [2]});
  results.push(col);
  col = new Clues({id:1, colour: 'black', data: [1,2,2]});
  results.push(col);
  col = new Clues({id:2, colour: 'black', data: [1,2,5]});
  results.push(col);
  col = new Clues({id:3, colour: 'black', data: [1,1,1,1]});
  results.push(col);  
  col = new Clues({id:4, colour: 'black', data: [3,1,4]});
  results.push(col);  
  col = new Clues({id:5, colour: 'black', data: [2,6,1]});
  results.push(col);  
  col = new Clues({id:6, colour: 'black', data: [12]});
  results.push(col);  
  col = new Clues({id:7, colour: 'black', data: [2,8]});
  results.push(col);  
  col = new Clues({id:8, colour: 'black', data: [1,7,1]});
  results.push(col);  
  col = new Clues({id:9, colour: 'black', data: [3,2,1,2]});
  results.push(col);  
  col = new Clues({id:10, colour: 'black', data: [1,1,2,2]});
  results.push(col);  
  col = new Clues({id:11, colour: 'black', data: [2,1,2,2]});
  results.push(col);  
  col = new Clues({id:12, colour: 'black', data: [1,1,2,1]});
  results.push(col);  
  col = new Clues({id:13, colour: 'black', data: [5,2]});
  results.push(col);  
  col = new Clues({id:14, colour: 'black', data: [3,2]});
  results.push(col);  
  col = new Clues({id:15, colour: 'black', data: [1,1]});
  results.push(col);  
  col = new Clues({id:16, colour: 'black', data: [1]});
  results.push(col);  
  col = new Clues({id:17, colour: 'black', data: [1]});
  results.push(col); 
  col = new Clues({id:18, colour: 'black', data: [1]});
  results.push(col);  
  col = new Clues({id:19, colour: 'black', data: [1]});
  results.push(col);
  return results;
}

module.exports = Cols;