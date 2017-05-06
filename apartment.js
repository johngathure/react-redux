import React from 'react';
import { Link } from 'react-router'

const Apartment = React.createClass({
	animateCard: function(ev){
		var card = $(ev.target).parent();
		card.addClass('animated pulse');
		setTimeout(function(){
			card.removeClass('animated pulse')
		}, 2000);
	},
	render: function(){
		var imageurlgenerated = this.props.data.image.startsWith("/");
		if(!imageurlgenerated){
			var imageurl = "/static"
			this.props.data.image = imageurl.concat("/",this.props.data.image);
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
			<div className="w3-card">
  				<img src={ this.props.data.image } className="card-images"/>
  				<div className="w3-container w3-center">
  					<p> { this.props.data.county } </p>
  					<p> { this.props.data.sdtype } kshs { this.props.data.rent} </p>
  				</div>
  				<Link to={`/apartment/${this.props.data.id}/`} className="w3-btn w3-teal w3-hover-white" onMouseOver={ this.animateCard }>
  					<i className="fa fa-info" aria-hidden="true"></i>
  					&nbsp; more details
  				</Link>
			</div>
		);
	}
});

export default Apartment;