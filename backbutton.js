import React from 'react';
import { browserHistory } from 'react-router';

const BackButton = React.createClass({
	back: function(){
		browserHistory.goBack();
	},
	render: function(){
		return(
			<div>
				<button className="w3-btn w3-teal w3-round-xxlarge" onClick={ this.back }>
					<i className="fa fa-arrow-left" aria-hidden="true"> </i>
				 	<span> Back </span> 
				 </button>
			</div>
		);
	}
});

export default BackButton;