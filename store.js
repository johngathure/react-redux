import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//redux reducer
import  rootReducer  from './reducers/reducer';

export const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware)
);

