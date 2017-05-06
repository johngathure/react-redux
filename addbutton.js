import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { checkUserStatus } from './actions/actions';

const AddButton = React.createClass({
	componentDidMount: function(){
		const { dispatch, isauthenticated } = this.props;
		if(isauthenticated === null)
			dispatch(checkUserStatus());
	},
	render: function(){
		const { isauthenticated } = this.props;
		if(isauthenticated){
			return(
				<div>
					<Link className="w3-btn w3-teal w3-round-xxlarge w3-right w3-half" to="/addapartment/">
						<i className="fa fa-plus"> </i>
						&nbsp; add your listing
					</Link> 
				</div>
			);
		}else{
			return(
				<div>
					<a className="w3-btn w3-teal w3-round-xxlarge w3-right" href="/accounts/signup/">
						<i className="fa fa-user-plus"> </i>
						&nbsp; sign up to add listing
					</a> 
				</div>
			);
		}
	}
});

function mapStateToProps(state){
	return{
		isauthenticated : state.isauthenticated
	}
}
export default connect(mapStateToProps)(AddButton);