import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
//components
import BackButton from './backbutton';


//api
import { populateCounties, previewImage, saveData, validateInputs } from './api/api.js';

//redux
import { saveApartment } from './actions/actions';

const AddNewListing = React.createClass({
	componentDidMount: function(){
		populateCounties();
		$('#previewsection').hide();
	},
	uploadImage: function(ev){
		ev.preventDefault();
		var filebutton = $('input[type="file"]').trigger('click');
			filebutton.on('change', function(ev){
				if(this.files && this.files[0]){
					var reader = new FileReader();

					reader.onload = function(e){
						$('#previewsection').show();
						$('img[data-upload="listing-image"]').attr('src', e.target.result);
					}

					reader.readAsDataURL(this.files[0]);
				}else{
					console.log('fuck');
				}

			});
	},
	saveListing: function(ev){
		ev.preventDefault();

		if(saveData() === false)
			return;
		
		var saveicon = $('#saveicon');
		var submitbtn = $('button[type="submit"] span');
		saveicon.removeClass('fa-paper-plane').addClass('fa-spinner fa-spin fa-fw');
		submitbtn.html('saving');
		saveData().done(function(result, status){
			saveicon.removeClass('fa-spinner fa-spin fa-3x fa-fw').addClass('fa-paper-plane');
			submitbtn.html('save');
			$('.w3-animate-fading').show();
			setTimeout(function(){
				browserHistory.push('/apartments/');
			},6000);

		});
	},
	checkCharacters: function(ev){
		var characters = ev.target.value.trim().length;
		var locationvalidation = $('span[data-error="location"]');
		var remainingcharacters = 50 - characters;
		locationvalidation.show();
		locationvalidation.css('color', 'green');
		locationvalidation.html(remainingcharacters);
		if(remainingcharacters < 0){
			locationvalidation.css('color', 'red');
			locationvalidation.html('Only 50 characters are required. Add any other information in the description section');
			return;
		}
	},
	render: function(){
		var style = {
			marginTop: "75px"
		}
		return(
			<div className="w3-row">
				<div className="w3-third w3-center" style={ style }>
					<BackButton />
					<div className="w3-container w3-green w3-animate-fading" style={{ margin: "10px", display: "none"}}>
  						<h3>Sucess!</h3>
  						<p>Your apartment has been saved. </p>
					</div> 
				</div>
				<div className="w3-twothird" style={ style }>
					<div className="w3-card-4">
						<div className="w3-container w3-teal">
							<h3> Add apartment </h3>
						</div>
						<form className="w3-container" data-sd="apartmentform" enctype="multipart/form-data">
							<p>
								<label className="w3-label w3-text-teal"><b>Name</b></label>
								<input className="w3-input w3-border w3-light-grey" name="name" type="text" placeholder="Do your apartments have a name?"/>
							</p>
							<p>
								<label className="w3-label w3-text-teal"><b>Type</b></label>
								<select className="w3-select w3-light-grey" name="sd-type">
									<option value="" disabled>Choose a type</option>
									<option value="singleroom">Single room</option>
									<option value="servantquarter">Servant quarter</option>
									<option value="bedsitter">Bed sitter</option>
									<option value="onebedroom">One bedroom</option>
									<option value="twobedroom">Two bedroom</option>
									<option value="threebedroom">Three bedroom</option>
									<option value="other">Other(Describe in the description section)</option>
								</select>
							</p>
							<p>
								<label className="w3-label w3-text-teal"><b>Monthly rent</b></label>
								<input className="w3-input w3-border w3-light-grey" name="rent" type="number" />
								<span data-error="rent"> </span>
							</p>
							<p>
								<label className="w3-label w3-text-teal"><b>County</b></label>
								<select className="w3-select w3-light-grey" name="county" data-type="counties">
									<option value="" disabled> Choose a county </option>
								</select>
							</p>
							<p>
								<label className="w3-label w3-text-teal"><b>Location</b></label>
								<input type="text" name="location" className="w3-input w3-border w3-light-grey" placeholder="where are your apartments located?" onChange={ this.checkCharacters }/>
								<span data-error="location"> </span>
							</p>
							<label className="w3-label w3-text-teal"><b>Image</b></label>
							<div className="w3-container">
								<div className="w3-row">
									<div className="w3-quarter" >
										<input type="file" name="image" />
										<button className="w3-btn w3-teal" data-type="upload-image" onClick={ this.uploadImage } >
											<i className="fa fa-upload" aria-hidden="true"></i>
											upload photo
										</button>
									</div>
									<div className="w3-rest" id="previewsection">
										<img src="" alt="no image" data-upload="listing-image" style={{ width:"20%", height:"20%"}}/>
									</div>
								</div>
							</div>
							<p>
								<label className="w3-label w3-text-teal"><b>Description</b></label>
								<textarea name="description" className="w3-input w3-border w3-light-grey" placeholder="small description about your listing"></textarea>
							</p>
							<p>
								<button className="w3-btn w3-teal" type="submit" onClick={ this.saveListing }>
									<i className="fa fa-paper-plane" aria-hiddden="true" id="saveicon"></i>
									<span> save </span>
								</button>
							</p>
						</form>
					</div>
				</div>
			</div>	
		);
	}
});

export default connect()(AddNewListing);