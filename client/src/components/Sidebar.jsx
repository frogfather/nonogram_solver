const React = require('react');
import ReactScrollableList from '../../node_modules/react-scrollable-list/dist/index'

class Sidebar extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    var newState = {puzzles: this.props.data, onlistclick: this.props.onlistclick}
    this.setState(newState)
  }

  listClick(event){
    event.persist()
    this.state.onlistclick(event)
  }

  render(){
    var options = []
    if (this.state){
      for (var i=0; i< this.state.puzzles.length;i++ ){
        options.push({id: i, content: this.state.puzzles[i].name})
      } 
    }
    return(
      <div id='sidebar' onClick = {this.listClick.bind(this)}>
      <ReactScrollableList listItems={options} heightOfItem={10} maxItemsToRender={30}/>
      </div>
      )
  }

}

export default Sidebar;
