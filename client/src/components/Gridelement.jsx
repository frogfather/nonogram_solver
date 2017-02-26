const React = require('react');
class Gridelement extends React.Component{

 constructor(props){
   super()
   this.state = {cell: props.data, onclick: props.onclick, rowno: props.rowno, colno: props.value, cellId: 'r'+props.rowno+'c'+props.value}
  }

  componentDidMount(){
    var thisCell = document.querySelector('#'+this.state.cellId);
    this.updateGridElement(thisCell)
  }

  componentDidUpdate(){
    var thisCell = document.querySelector('#'+this.state.cellId);
    this.updateGridElement(thisCell)  
     }

  updateGridElement(cell){
    const ctx = cell.getContext('2d');
      //if a display is 'cross' we draw grey bg and cross
      //if a colour we fill with colour
      //if 'clear' we just fill with bg colour

      //something weird here - why are these numbers so huge?
      //should be pixels?!
      ctx.fillStyle = this.state.cell.colour;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 20;
      ctx.fillRect(0,0,280,200);
      
      if(this.state.cell.displayValue === "cross"){
      ctx.beginPath();
      ctx.moveTo(30,30);
      ctx.lineTo(270,140);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(270,30);
      ctx.lineTo(30,140);
      ctx.stroke();
      }

     
      
  }

  clickCell(event){
    this.state.onclick({row:this.state.rowno, col:this.state.colno});
  }

  render(){
    const divStyle = {}



    return(
      <canvas className='gridelement' id={this.state.cellId} ref='canvas' style={divStyle} onClick={this.clickCell.bind(this)}>
  
      </canvas>
      )
  }

}

export default Gridelement;