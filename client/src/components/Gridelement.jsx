const React = require('react');

class Gridelement extends React.Component{

 constructor(props){
   super()
   this.state = {cell: props.cell}
  }

  render(){
    return(
      <div id='gridelement'>
      {this.state.cell.displayValue}
      </div>
      )
  }

}

export default Gridelement;