import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

//components
import BackButton from './backbutton';
import AddComparableBtn from './addcomparablesbtn';

//actions 
import { addComparable } from './actions/actions';

const ApartmentDetail = React.createClass({
	getInitialState: function(){
		return({data: {}});
	},
	loadOwner: function(id){
		$.ajax({
			url: 'http://127.0.0.1:8000/owner/?format=json',
			dataType: 'json',
			cache: false,
			data: {id : id},
			success: function(result){
				this.setState({data: result});;
			}.bind(this),
			error: function(xhr, status, error){
				console.error('',status, error.toString());
			}.bind(this)
		});

	},
	addToComparable: function(){
		var btntext = $('#btntext');
		var apartment = this.props.data;
		apartment['email'] = this.state.data.email;
		apartment['phonenumber'] = this.state.data.username;

		const { comparables } = this.props;
		const { dispatch } = this.props;
		if(!comparables.length){
			/*var apartmentcomparables = [];
			apartmentcomparables.push(apartment);*/
			dispatch(addComparable(apartment));
			btntext.html(' added');
			$(btntext.parent()[0]).attr('disabled', 'disabled');
			return;
		}
		
		var comparableexistance = _.some(comparables, comparable => comparable.id === apartment.id);
		if(comparableexistance){
			btntext.html(' already exists');
			$(btntext.parent()[0]).attr('disabled', 'disabled');
			return;
		}

		if(comparables.length > 10){
			btntext.html(' basket full');
			$(btntext.parent()[0]).attr('disabled', 'disabled');
			return;	
		}
		/*var updateComparableState = [];
		updateComparableState.push(...comparables, apartment);*/
		dispatch(addComparable(apartment));
		btntext.html(' added');
		$(btntext.parent()[0]).attr('disabled', 'disabled');	
	},
	animateTab: function(element){
		element.addClass('animated zoomIn');
		setTimeout(function(){
			element.removeClass('animated zoomIn')
		}, 2000);
	},
	opacityTab: function(ev){
		var alltabs = $('.tabs');
		for(var i=0; i<alltabs.length; i++){
			$(alltabs[i]).css('display', 'none');
		}
		var tabid = $(ev.target).attr('id');
		switch(tabid){
			case "imagetab":
				var imagetab = $('#image');
				$(imagetab).css('display', 'block');
				this.animateTab(imagetab);
				break;
			case "abouttab":
				var abouttab = $('#about');
				$(abouttab).css('display', 'block');
				this.animateTab(abouttab);
				break;
			case "descriptiontab":
				var descriptiontab = $('#description');
				$(descriptiontab).css('display', 'block');
				this.animateTab(descriptiontab);
				break;
		}
	},
	componentDidMount: function(){
		var id = this.props.data.owner;
		this.loadOwner(id);
	},
	render: function(){
		const { data } = this.props;
		var style = {
			marginTop: "75px"
		}
		switch(this.props.data.sdtype){
			case "singleroom":
				this.props.data.sdtype = "single room";
				break;
			case "servantquarter":
				this.props.data.sdtype = "servant quarter";
				break;
			case "bedsitter":
				this.props.data.sdtype = "bed sitter";
				break;
			case "onebedroom":
				this.props.data.sdtype = "one bedroom";
				break;
			case "twobedroom":
				this.props.data.sdtype = "two bedroom";
				break;
			case "threebedroom":
				this.props.data.sdtype = "three bedroom";
				break;
			case "other":
				this.props.data.sdtype = "more than three bedrooms";
				break;
		}
		return(
			<div className="w3-row">
				<div className="w3-third w3-center" style={style}>
					<BackButton />
					<AddComparableBtn addToComparable={ this.addToComparable } />
				</div>
				<div className="w3-twothird">
					<div className="w3-container" style={style}>
						
							<div className="w3-btn-group">
								<button id="imagetab" className="w3-btn w3-teal w3-hover-white" style={ {width: "33.3%"} } onClick={ this.opacityTab }>
									<i className="fa fa-picture-o" aria-hidden="true"></i>
									&nbsp; image
								</button>
								<button id="abouttab" className="w3-btn w3-teal w3-hover-white" style={ {width: "33.3%"} } onClick={ this.opacityTab }>
									<i className="fa fa-feed" aria-hidden="true"></i>
									&nbsp; about the aparment
								</button>
								<button id="descriptiontab" className="w3-btn w3-teal w3-hover-white" style={ {width: "33.3%"} } onClick={ this.opacityTab }>
									<i className="fa fa-phone" aria-hidden="true"></i>
									&nbsp; contact details
								</button>
							</div>
							<div id="image" className="w3-container tabs" style={{display: "none"}}>
								<img src={this.props.data.image} className="detailcard-images"/>
							</div>
							<div id="about" className="w3-container tabs" style={{display: "none"}}>
								<div className="w3-card">
									<ul className="w3-ul">
										<li>
											<h4> Name </h4>
											<p> { this.props.data.name } </p>
										</li>
										<li>
											<h4> Type </h4>
											<p> { this.props.data.sdtype } </p>
										</li>
										<li>
											<h4> Monthly rent </h4>
											<p> { this.props.data.rent } </p>
										</li>
										<li>
											<h4> County </h4>
											<p> { this.props.data.county } </p>
										</li>
										<li>
											<h4> location </h4>
											<p> { this.props.data.location } </p>
										</li>
									</ul>
								</div>
							</div>
							<div id="description" className="w3-container tabs" style={{display: "none"}}>
								<div className="w3-card">
									<ul className="w3-ul">
										<li>
											<h4> Description </h4>
											<p> { this.props.data.description } </p>
										</li>
										<li>
											<h4> Phone number </h4>
											<p> { this.state.data['username'] } </p>
											<h4> Email </h4>
											<p> { this.state.data['email'] } </p>
										</li>
									</ul>
								</div>
							</div>
						
					</div>
				</div>
			</div>
		);
	},
});

function mapStateToProps(state, ownProps){
	var apartments = state.apartments;
	var apartment = [];

	for(var item in apartments){
		if(apartments[item]['id'] == ownProps.params.apartmentId){
			apartment = apartments[item];
			break;
		}
	}
	return {
		data: apartment,
		comparables: state.comparables
	}
}

export default connect(mapStateToProps)(ApartmentDetail);