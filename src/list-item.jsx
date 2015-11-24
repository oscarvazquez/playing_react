var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://sweltering-inferno-4621.firebaseio.com/';

module.exports = React.createClass({
	getInitialState: function(){
		console.log('this is going into the intial state')
		return {
			text: this.props.item.text,
			done: this.props.item.done,
			textChanged: false
		}
	},
	componentWillMount: function(){
		this.fb = new Firebase(rootUrl + "items/" + this.props.item.key)
	},
	render: function(){
		console.log('this is going in the render function')
		return <div className = "input-group">
			<span className = "input-group-addon">
				<input 
				checked={this.state.done}
				onChange= {this.handleDoneChange}
				type = "checkbox" />
			</span>
				<input type = 'text'
				disabled = {this.state.done}
				className = "form-control"
				onChange = {this.handleTextChange}
				value = {this.state.text} />
			<span className = "input-group-btn">
				{this.changesButtons()}
				<button 
				onClick= {this.handleDeleteClick}
				className = "btn btn-primary">
					Delete
				</button>
			</span>
		</div>
	},
	changesButtons: function() {
		if (!this.state.textChanged){
			return null
		} else {
			return [
				<button 
				onClick = {this.handleSaveClick}
				className = "btn btn-default">
					Save
				</button>,
				<button 
				onClick = {this.handleUndoClick}
				className = "btn btn-default">
					Undo
				</button>
			]
		}
	},
	handleDoneChange: function(event){
		var update = {done: event.target.checked}
		this.setState(update);
		this.fb.update(update);
	},
	handleDeleteClick: function(event){
		this.fb.remove(); 
	},
	handleTextChange: function(event){
		this.setState({
			text: event.target.value,
			textChanged: true
		})
	},
	handleUndoClick: function(event){
		this.setState({
			text: this.props.item.text, 
			textChanged: false
		})
	},
	handleSaveClick: function(event){
		this.fb.update({text: this.state.text});
		this.setState({textChanged: false});
	}
})