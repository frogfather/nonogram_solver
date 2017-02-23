var React = require('react');
var PiggyBank = React.createClass({
  getInitialState: function(){
    console.log("getInitialState");
    return { total:0}
  },

  componentWillMount: function(){
    console.log("componentWillMount");
    var button = document.querySelector('button');
    console.log("Button: ",button);
  },

  componentDidMount: function(){
    console.log("componentDidMount");
    var button = document.querySelector('button');
    console.log("Button: ",button);
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("Component WILL UPDATE!");
    console.log("Next state: ",nextState);
    console.log("Next props: ",nextProps);
  },

  componentDidUpdate: function(prevProps, prevState){
    console.log("Component DID UPDATE!");
    console.log("Prev state: ",prevState);
    console.log("Prev props: ",prevProps);
  },


  addToSavings: function(){
    this.setState({
      total: this.state.total + this.props.depositAmount
    })
  },
  removeFromSavings: function(){
    this.setState({
      total: this.state.total - this.props.depositAmount
    })
  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    owner: React.PropTypes.string.isRequired,
    depositAmount: React.PropTypes.number.isRequired
  },
  render: function(){
    console.log("Rendering...")
    return (
      <div className="bank-box">
        <h1>{this.props.title} owner:{this.props.owner}</h1>
        <p> Total Savings: £{this.state.total}
        </p>
        <button type="button" onClick={this.addToSavings}>Deposit change!</button>
        <button type="button" onClick={this.removeFromSavings}>Withdraw change!</button>
      </div>
      )
  }
});


module.exports = PiggyBank;