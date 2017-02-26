const React = require('react');
class Gridelement extends React.Component{

 constructor(props){
   super()
   this.state = {cell: props.data, onclick: props.onclick, rowno: props.rowno, colno: props.value, cellId: props.rowno+':'+props.value}
  }

  componentDidMount(){
    this.updateGridElement()
  }

  updateGridElement(){
    const ctx = this.refs.canvas.getContext('2d');
      ctx.strokeStyle = "red";
      console.log(ctx)
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(20,20);
      ctx.stroke();
  }

  clickCell(event){
    this.state.onclick({row:this.state.rowno, col:this.state.colno});
  }

  render(){
    const divStyle = {backgroundColor: this.state.cell.colour}

    return(
      <canvas className='gridelement' ref='canvas' style={divStyle} onClick={this.clickCell.bind(this)}>
  
      </canvas>
      )
  }

}

export default Gridelement;