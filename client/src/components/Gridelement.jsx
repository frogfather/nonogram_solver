const React = require('react');
class Gridelement extends React.Component{

 constructor(props){
   super()
   this.state = {cell: props.data, onclick: props.onclick, rowno: props.rowno, colno: props.value}
  }

  clickCell(event){
    this.state.onclick({row:this.state.rowno, col:this.state.colno});
  }

  render(){
    return(
      <div className='gridelement' onClick={this.clickCell.bind(this)}>
      {this.state.cell.displayValue}
      </div>
      )
  }

}

export default Gridelement;