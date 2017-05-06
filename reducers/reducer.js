import { LOAD_APARTMENTS, 
		ADD_COMPARABLE, 
		REMOVE_COMPARABLE, 
		IS_USER_AUTHENTICATED, 
		LOADING_STATUS,
		LOAD_QUERY_APARTMENTS } from '../actions/actions';
import _ from 'lodash';

var initialState = {
	apartments: [],
	comparables: [],
	isauthenticated: null,
	isloading: false,
	nexturl: ""
};

export default function rootReducer(state=initialState, action){
	switch(action.type){
		case LOAD_APARTMENTS:
			var newState = {...state, nexturl: action.nexturl, isloading: false};
			newState.apartments.push(...action.apartments);
			return newState;
		case LOAD_QUERY_APARTMENTS:
			var newState;
			if(action.previousurl === null)
		 		newState  = {...state, apartments: [], comparables:[], nexturl: action.nexturl, isloading: false};
		 	else
		 		newState = {...state, nexturl: action.nexturl}
			newState.apartments.push(...action.apartments);
			return newState;
		case ADD_COMPARABLE:
			var oldState = {...state }
			var newState = oldState.comparables.push(action.apartment); 
			return{...state, ...newState };
		case REMOVE_COMPARABLE:
			return {...state, comparables: action.comparables};
		case IS_USER_AUTHENTICATED:
			return {...state, isauthenticated: action.status};
		case LOADING_STATUS:
			return{...state, isloading: action.status};
		default: 
			return state;
	}

	return state;
}


function loadQUeryApartmentsReducer(state, action){
	
}
