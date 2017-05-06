var counties = ["Bomet","Bungoma","Busia","Elgeyo_Marakwet","Garissa","Homa_Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu"
		,"Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira",
		"Nyandarua","Nyeri","Samburu","Siaya","Taita_Taveta","Tharaka_Nithi","Trans_Nzoia","Turkana","Uasin_Gishu","Vihiga","Wajir","West_Pokot"];

export function populateCounties(){
	var county_select = $('select[data-type="counties"]');

	counties.map(function(county){
		county_select.append(
			"<option>" + county + "</option>"
		);
	});
}

export function previewImage(){
	$('button[data-type="image-upload"]').on('click', function(ev){
		ev.preventDefault();
		var filebutton = $('input[type="file"]');
		filebutton.trigger('click');

		filebutton.on('change', function(ev){
			if(this.files && this.files[0]){
				var reader = new FileReader();

				reader.onload = function(e){
				$('img[data-upload="listing-image"]').attr('src', e.target.result);
				}

				reader.readAsDataURL(this.files[0]);
			}else{
				console.log('fuck');
			}

		});
	});
}

export function saveData(){
	var formelement = document.querySelector("form");
	var formdata = $(formelement).serializeArray();

	var formisvalid = validateInputs(formdata[2]['value'], formdata[4]['value']);

	if(!formisvalid)
		return false;

	var data = new FormData(formelement);
	data.append('csrfmiddlewaretoken', $('input[name="csrfmiddlewaretoken"]').val());


	return $.ajax({
		url: 'http://127.0.0.1:8000/apartments/',
		type: 'POST',
		enctype: 'multipart/form-data',
		data: data,
		processData: false,
		contentType: false,
	});
	
}


function validateInputs(rent, location){
	var rentvalidation = $('span[data-error="rent"]');
	var locationvalidation = $('span[data-error="location"]');
	if(!rent){
		$(rentvalidation).text('Rent  is required');
		$(rentvalidation).css('color', 'red');
		return false;
	}else if(!Number(rent)){
		$(rentvalidation).text('Rent  must be a number');
		$(rentvalidation).css('color', 'red');
		return false;
	}else if(!location){
		$(locationvalidation).text('Location is required');
		$(locationvalidation).css('color', 'red');
		return false;
	}else if(location.length > 50){
		$(locationvalidation).text('Only 50 characters are required. Add any other information in the description section');
		$(locationvalidation).css('color', 'red');
		return false;
	}

	return true;
}