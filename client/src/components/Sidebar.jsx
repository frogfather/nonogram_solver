const React = require('react');
import ReactScrollableList from '../../node_modules/react-scrollable-list/dist/index'

class Sidebar extends React.Component{

  constructor(props){
    super(props);
    this.state={onclick: this.props.onclick, onbuttonclick: this.props.onbuttonclick}
  }

  buttonClick(event){
    event.persist();
    console.log(event)
    this.state.onbuttonclick(event)
  }

  render(){
    var options = []
    for (var i = 0; i<= 10;i++){
      options.push({id: i, content: i*2})
    }
    return(
      <div id='sidebar'>
      <ReactScrollableList listItems={options} heightOfItem={10} maxItemsToRender={50}/>
      <div id='controls'>
      <button type="button" onClick={this.buttonClick.bind(this)}>Click me!</button>
      </div>
      </div>
      )
  }

}

export default Sidebar;
