const React = require('react');
class Gridelement extends React.Component{

 constructor(props){
   super()
   this.state = {cell: props.data, onclick: props.onclick, rowno: props.data.cellRow, colno: props.data.cellCol, show: props.show , cellId: 'r'+props.data.cellRow+'c'+props.data.cellCol}
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
      var displaying;
      // console.log(this.state.cell)
      if (this.state.cell.show === 'auto'){
        displaying = this.state.cell.autoValue
        }else
        {
        displaying = this.state.cell.userValue
        }

      if ((displaying === 'clear')||(displaying === "cross")){
        ctx.fillStyle = 'gray';
        ctx.strokeStyle = "black";
        ctx.lineWidth = 20;
        ctx.fillRect(0,0,280,200);
        if(displaying === "cross"){
        ctx.beginPath();
        ctx.moveTo(30,30);
        ctx.lineTo(270,140);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(270,30);
        ctx.lineTo(30,140);
        ctx.stroke();
        }
      }else
      {
      ctx.fillStyle = displaying;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 20;
      ctx.fillRect(0,0,280,200);
      }




  }

  clickCell(event){
    this.state.onclick({row:this.state.rowno, col:this.state.colno});
  }

  render(){
    const divStyle = {width: this.props.esize, height: this.props.esize}

    return(
      <canvas className='gridelement' id={this.state.cellId} ref='canvas' style={divStyle} onClick={this.clickCell.bind(this)}>

      </canvas>
      )
  }

}

export default Gridelement;
