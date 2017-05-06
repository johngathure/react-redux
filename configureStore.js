import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//redux reducer
import  rootReducer  from './reducers/reducer';

export default function configureStore(){
	return createStore(
		rootReducer,
		 window.devToolsExtension && window.devToolsExtension(),
		applyMiddleware(
			thunkMiddleware
		) 
	);
}

