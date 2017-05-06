import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';

const todos = [
	{
		task: 'make react tutorial',
		isCompleted: false
	},
	{
		task: 'eat dinner',
		isCompleted: true
	}
]


class CreateTodo extends React.Component{
	handleCreate(event){
		event.preventDefault() 
		this.props.createTask(this.refs.createInput.value);
		this.refs.createInput.value = '';
	}
	render(){
		return(
			<form onSubmit={ this.handleCreate.bind(this)}>
				<input type="text" placeholder="what do i need to do?" ref="createInput"/>
				<button> Create </button>
			</form>
		)
	}
}
class TodosListItem extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isEditing: false,

		};
	}
	renderTaskSection(){
		const { task, isCompleted } = this.props;
		const taskstyle = {
			color: isCompleted ? 'green' : 'red',
			cursor: 'pointer'
		};

		if(this.state.isEditing){
			return(
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input type="text" defaultValue={task} ref="editinput" />
					</form>
				</td>
			);
		}
		return(
			<td style = { taskstyle } onClick={ this.props.toggleTask.bind(this, task)}> { this.props.task } </td>
		);
	}
	renderActionSection(){
		console.log(this.props);
		if(this.state.isEditing){
			return(
				<td>
					<button onClick={this.onSaveClick.bind(this)}> save </button>
					<button onClick={ this.onCancelClick.bind(this) }> Cancel </button>
				</td>
			);
		}

		return (
			<td>
				<button onClick={this.onEditClick.bind(this)}> Edit </button>
				<button onClick={this.props.deleteTask.bind(this, this.props.task)}> Delete </button>
			</td>
		);
	}
	onSaveClick(event){
		event.preventDefault();

		const oldTask = this.props.task;
		const newTask = this.refs.editinput.value;
		this.props.saveTask(oldTask, newTask);
		this.setState({ isEditing: false});
	}
	onCancelClick() {
		this.setState({isEditing:false})
	}
	onEditClick() {
		this.setState({isEditing: true});
	}
	render(){
		return(
			<tr>
				{ this.renderTaskSection() }
				{ this.renderActionSection() }
			</tr>
		);
	}
} 
class TodosList extends React.Component{
	renderItems(){
		const props = _.omit(this.props, 'todos');

		return this.props.todos.map((todo, index) => <TodosListItem key={ index } {...todo } {...props} /> );
	}
	render(){
		console.log(this.props.todos);
		return(
			<table>
				<thead>
					<tr>
						<th> Task </th>
						<th> Action  </th>
					</tr>
				</thead>
				<tbody>
					{this.renderItems()}
				</tbody>
			</table>
		)
	}
} 
class NewApp extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			todos
		};
	}
	createTask(task){
		this.state.todos.push({
			task,
			isCompleted: false
		});

		this.setState({todos: this.state.todos});
	}
	toggleTask(task){
		const foundTodo = _.find(this.state.todos, todo => todo.task === task);

		foundTodo.isCompleted = !foundTodo.isCompleted;
		this.setState({todos: this.state.todos});
	}
	saveTask(oldTask, newTask){

		const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
		foundTodo.task = newTask;

		this.setState({todos: this.state.todos});

	}
	deleteTask(taskToDelete){
		_.remove(this.state.todos, todo => todo.task === taskToDelete);
		this.setState({todos: this.state.todos})
	}
	render(){
		return( 
			<div>
				<h3> Todos App</h3>
				<CreateTodo createTask={this.createTask.bind(this)} />
				<TodosList todos={ this.state.todos }  toggleTask={ this.toggleTask.bind(this)} saveTask={ this.saveTask.bind(this)} deleteTask={this.deleteTask.bind(this)}/>
			</div>
		);	

	}
}

render(
	<NewApp />,
	document.getElementById('homes-list')
)

