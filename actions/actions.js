
//actions
export const LOAD_APARTMENTS = 'LOAD_APARTMENTS';
export const ADD_COMPARABLE = 'ADD_COMPARABLE';
export const REMOVE_COMPARABLE = 'REMOVE_COMPARABLE';
export const IS_USER_AUTHENTICATED = 'IS_USER_AUTHENTICATED';
export const LOADING_STATUS = 'LOADING_STATUS';
export const LOAD_QUERY_APARTMENTS = 'LOAD_QUERY_APARTMENTS';

//api thunk actions 
export function fetchApartments(url){
	return function(dispatch){
		$.get(url, function(data, status){
			dispatch(loadApartments(data['results'], data['next']));
		});
	}
}

export function fetchQueryApartments(data){
	return function(dispatch){
		$.get('http://127.0.0.1:8000/apartments',data, function(result, status){
			console.log(result);
			dispatch(loadQueryApartments(result['results'], result['next'], result['previous']));
		});
	}
}
export function checkUserStatus(){
	return function(dispatch){
		$.get('http://127.0.0.1:8000/userstatus/',function(result, status){
			dispatch(userStatus(result['is_authenticated']));
		});
	}
}

//action creators
export function loadApartments(apartments, nexturl){
	return {
		type: LOAD_APARTMENTS,
		apartments,
		nexturl
	}
}

export function loadQueryApartments(apartments, nexturl, previousurl){
	return{
		type: LOAD_QUERY_APARTMENTS,
		apartments,
		nexturl,
		previousurl
	}
}
export function addComparable(apartment){
	return {
		type: ADD_COMPARABLE,
		apartment
	}
}

export function removeComparable(comparables){
	return{
		type: REMOVE_COMPARABLE,
		comparables
	}
}

export function userStatus(status){
	return{
		type: IS_USER_AUTHENTICATED,
		status
	}
}

export function loadingStatus(status){
	return{
		type: LOADING_STATUS,
		status
	}
}