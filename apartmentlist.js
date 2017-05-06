import React from 'react';



//components
import Apartment from './apartment';
var style = {
	marginBottom:"10px"
};
const ApartmentList = React.createClass({
	render: function(){
		var apartmentNodes = this.props.data.map(function(apartment, index){
			return(
				<div className="w3-container w3-quarter" key={apartment.id} style={style}>
    				<Apartment data={ apartment } />
  				</div>
			);
		});
		return(
			<div className="w3-row">
				{ apartmentNodes }
			</div>
		);
	}
});

export default ApartmentList;