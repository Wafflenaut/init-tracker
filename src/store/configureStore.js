import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import combatantsReducer from '../reducers/combatants';
import filtersReducer from '../reducers/filters';
import libraryReducer from '../reducers/library';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
	  combatants: combatantsReducer,
	  filters: filtersReducer,
	  library: libraryReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
