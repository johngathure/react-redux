import { ADD_APARTMENT, VIEW_APARTMENT, LOAD_APARTMENTS } from './actions'; 


export function fetchApartments(){
	return function(dispatch){
		return  $.get('http://127.0.0.1:8000/apartments/?format=json').done(function(data, status){
			dispatch(loadApartments(data));
		});
	}
}

export function addApartment(attributes){
	return {
		type: ADD_APARTMENT,
		attributes
	}
}

export function viewAPartment(id){
	return {
		type: VIEW_APARTMENT,
		id
	}
}

export function loadApartments(apartments){
	return {
		type: LOAD_APARTMENTS,
		apartments
	}
}
