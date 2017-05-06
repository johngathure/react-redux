import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
//components
import BackButton from './backbutton';
import RemoveComparableBtn from './removecomparablebtn';

const Comparables = React.createClass({
	render: function(){
		var comparables = this.props.state['comparables'];
		return(
			<div style={{ marginTop: "75px"}}>
				<BackButton />
				<div style={{marginTop:"30px"}}>
					<table className="w3-table w3-striped w3-bordered w3-card">
						<TableHead />
						<TableBody comparables={comparables} />
					</table>
				</div>
			</div>
		);
	}
});

const TableHead = React.createClass({
	render: function(){
		return(
			<thead>
				<tr className="w3-teal">
					<th>Type</th>
					<th>Monthly rent</th>
					<th>County</th>
					<th>Location</th>
					<th> Actions </th>
				</tr>
			</thead>
		);
	}
});

const TableBody = React.createClass({
	render: function(){
		var comparableItems = _.map(this.props.comparables, comparable => <ComparableItem key={comparable.id} comparable={comparable} />);
		return(
			<tbody>
				{ comparableItems }
			</tbody>
		);
	}
});

const ComparableItem = React.createClass({
	render: function(){
		return(
			<tr>
				<td> { this.props.comparable.sdtype } </td>
				<td> { this.props.comparable.rent } </td>
				<td> { this.props.comparable.county } </td>
				<td> { this.props.comparable.location } </td>
				<td>
					<div className="w3-row">
						<div className="w3-half">
							<Link to={`/apartment/${this.props.comparable.id}/`} className="w3-btn w3-teal w3-small" onMouseOver={ this.animateCard }>
  								<i className="fa fa-location-arrow" aria-hidden="true"></i>
  								&nbsp; Go to apartment
  						</Link>
						</div>
						<div className="w3-half">
							<RemoveComparableBtn id={ this.props.comparable.id } />
						</div>
					</div>
				</td>
			</tr> 
		);
	}
});


const mapStateToProps = (state) => {
	return{
		state: state
	}
}

export default connect(mapStateToProps)(Comparables);