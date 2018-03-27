import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import combatantsReducer from '../reducers/combatants';
import encounterReducer from '../reducers/encounter';
import libraryReducer from '../reducers/library';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
	  combatants: combatantsReducer,
	  encounter: encounterReducer,
	  library: libraryReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
