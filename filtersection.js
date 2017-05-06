import React from 'react';
import { connect } from 'react-redux'

//api
import { populateCounties } from './api/api.js';


import { fetchQueryApartments, loadingStatus } from './actions/actions';

const FilterSection = React.createClass({
	componentDidMount: function(){
		populateCounties();
	},
	displayLocationInput: function(ev){
		var countyvalue = ev.target.value;
		var locationinput = $('input[name="location"]');
		if(!countyvalue){
			locationinput.val("");
			locationinput.css('display', 'none');
		}
		else
			locationinput.css('display', 'block').css('width', '75%');
	},
	getFilter: function(){
		var type = $('select[name="type"]').val().trim();
		var minimumrent = $('input[name="minimumrent"]').val().trim();
		var maximumrent = $('input[name="maximumrent"]').val().trim();
		var county = $('select[name="county"]').val().toLowerCase().trim();
		var location = $('input[name="location"]').val().toLowerCase().trim();

		if(!type && !minimumrent && !maximumrent && !county && !location)
			return;
		else{	
			var querydata = {
				type: type,
				minimumrent: minimumrent,
				maximumrent: maximumrent,
				county : county,
				location: location,
			}

			const { dispatch } = this.props;
			dispatch(loadingStatus(true));
			dispatch( fetchQueryApartments (querydata));
		}
	},
	renderFilterButton: function(){
		if(!this.props.state.isLoading){
			return(
				<button className="w3-btn w3-teal" onClick={ this.getFilter }>
			 		<i className="fa fa-filter" aria-hidden="true"></i>
			 		&nbsp; Go!
			 	</button>
			);
		}else{
			return(
				<button>
					<i class="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
					dude
				</button>
			);
		}
	},
	render: function(){
		var style = {
			width: "75%"
		}
		return(
			<div className="w3-container">
				<div className="w3-row">
					<div className="w3-container w3-third">
						<p>
						 	<select className="w3-select" name="type">
						 		<option value=""> Choose apartment type </option>
						 		<option value="singleroom"> Single room </option>
						 		<option value="servantquarter"> Servant quater </option>
						 		<option value="bedsitter"> Bed sitter </option>
						 		<option value="onebedroom"> One bedroom </option>
						 		<option value="twobedroom"> Two bedroom </option>
						 		<option value="threebedroom"> Three bedroom </option>
						 		<option value="other"> Other </option>
						 	</select> 
						 </p>
					 </div>
					 <div className="w3-container w3-third">
						 <p>
						 	<input className="w3-input w3-animate-input" name="minimumrent" type="number" placeholder="Rent range from" style={style} /> 
						 </p>
					 </div>
					 <div className="w3-container w3-third">
						 <p>
						 	<input className="w3-input w3-animate-input" type="number" name="maximumrent" placeholder="to" style={style} /> 
						 </p>
					 </div>
					 <div className="w3-container w3-third">
					 	<p>
					 		<select className="w3-select" name="county" data-type="counties" onChange={ this.displayLocationInput }>
					 			<option value=""> Choose a county </option>
					 		</select>
					 	</p>
					 </div>
					 <div className="w3-container w3-third">
						 <p>
						 	<input className="w3-input w3-animate-input" name="location" type="text" placeholder="location" style={ {display:"none"} } /> 
						 </p>
					 </div>
					 <div className="w3-container w3-third">
					 	<p>
						 	{ this.renderFilterButton() }
						 </p>
					 </div>
				</div>
			</div>
		);
	}
});

function mapStateToProps(state){
	return{
		state: state
	}
}
export default connect(mapStateToProps)(FilterSection);