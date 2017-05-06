import React from 'react';

const AddComparableBtn = React.createClass({
	render: function(){
		return( 
			<div style={{ marginTop: "20px" }}>
				<button className="w3-btn w3-teal" onClick={ this.props.addToComparable }>
					<i className="fa fa-shopping-basket" aria-hidden="true"> </i>
					<span id="btntext"> &nbsp; Add to comparables </span>
				</button>
			</div>
		);
	}
});

export default AddComparableBtn;