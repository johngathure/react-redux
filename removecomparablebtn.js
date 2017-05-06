import React from 'react';
import { connect } from 'react-redux';

//actions
import { removeComparable } from './actions/actions';

const RemoveComparableBtn = React.createClass({
	removeComparable: function(){
		const { dispatch, comparables } = this.props;
		const id = this.props.id;
		_.remove(comparables, comparable => comparable.id === id);
		dispatch(removeComparable(comparables));
	},
	render: function(){
		return(
			<button className="w3-btn w3-teal" onClick={ this.removeComparable }>
				<i className="fa fa-trash" aria-hidden="true"></i>
				<span> &nbsp; remove </span>
			</button>
		);
	}
});

function mapStateToProps(state){
	return {
		'comparables': state.comparables,
	}
}

export default connect(mapStateToProps)(RemoveComparableBtn); 