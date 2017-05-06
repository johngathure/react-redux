import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore'; 

//self made components
import Apartments from './apartments.js';
import AddNewListing from './addlisting'; 
import ApartmentDetail from './apartmentdetail';
import Comparables from './comparables';

const store = configureStore();
const root = document.getElementById('root');

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="addapartment/" component={AddNewListing} />
			<Route path="apartments/" component={Apartments}/>
			<Route path="apartment/:apartmentId/" component={ApartmentDetail} />
			<Route path="comparables/" component={Comparables} />
		</Router>
	</Provider>,
	root
);
