import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//components
import ApartmentList from './apartmentlist';
import FilterSection from './filtersection';
import AddButton from './addbutton';

import { fetchApartments, loadingStatus } from './actions/actions';

const Apartments = React.createClass({
	componentDidMount: function(){
		const { apartments }  = this.props.state;
		const { dispatch } = this.props;
		if(apartments.length === 0){
			dispatch(loadingStatus(true));
			dispatch( fetchApartments('http://127.0.0.1:8000/apartments/?format=json') );
		}
	},
	renderComparableBtn: function(){
		if(this.props.state.comparables.length > 0){
			return(
				<ComparablesBtn />
			);
		}
	},
	renderLoadingIcon: function(){
		if(this.props.state.nexturl === null){
			return(
				<button className="w3-btn w3-teal w3-btn-block w3-round-xxlarge" disabled='disabled'>
					<i className="fa fa-ban" aria-hidden="true"> </i>
					 &nbsp; no more results
				</button> 
			);
		}

		if(this.props.state.isloading){
			return(
				<button className="w3-btn w3-teal w3-btn-block w3-round-xxlarge" disabled="disabled">
					<i className="fa fa-refresh fa-spin fa-fw" aria-hidden="true"> </i>
					<span> &nbsp; Loading  </span>
				</button> 
			);
		}else{
			return(
				<button className="w3-btn w3-teal w3-btn-block w3-round-xxlarge" onClick={ this.loadMore }>
					<i className="fa fa-refresh" aria-hidden="true"> </i>
					 &nbsp; Load more 
				</button> 
			);
		}
	},
	loadMore: function(ev){
		const { dispatch } = this.props;
		dispatch(loadingStatus(true));
		dispatch(fetchApartments(this.props.state.nexturl));
	},
	render: function(){
		const { apartments } = this.props.state;
		const style = {
			marginBottom: "10px"
		}
		return(
				<div style={{ marginTop: "75px"}}>
					<div className="w3-row">
						<div className="w3-half" style={style}>
							<FilterButton/>
						</div>
						<div className="w3-half" style={style}>
							<div className="w3-row">
								<AddButton />
								{ this.renderComparableBtn() }
							</div>
						</div>
					</div>
					<div id="filtersection" className="w3-card" style={ {marginBottom: "10px", display: "none"} }>
						 <FilterSection />
					</div>
					<ApartmentList data = { apartments } />
					<p>
					{ this.renderLoadingIcon() }

						
					</p>
				</div>
		)
	}
});

const FilterButton = React.createClass({
	openFilter: function(){
		var filtersection = $('#filtersection');
		$(filtersection).fadeToggle("slow");
	},
	render: function(){
		return(
			<div>
				<button className="w3-btn w3-teal w3-round-xxlarge w3-left w3-opennav " onClick={ this.openFilter }>
					<i className="fa fa-filter" aria-hidden="true"></i> 
					&nbsp; Filter
				</button>
			</div>
		);
	}
});

const ComparablesBtn = React.createClass({
	render: function(){
		return(
			<div className="w3-half">
				<Link to="/comparables/" className="w3-btn w3-teal w3-medium">
					<i className="fa fa-shopping-basket" aria-hidden="true"> </i> 
					<span> &nbsp; view comparables </span> 
				</Link>
			</div>
		);
	}
});
function mapStateToProps(state){
	
	return{
		state: state
	}
}
export default connect(mapStateToProps)(Apartments);