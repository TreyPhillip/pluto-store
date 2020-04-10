import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './components/Reducers';
//persist the state
import {persistStore, persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage' //defaults to localstorage

const initialState = {};
const middleware =[thunk];


const persistConfig ={
    key:rootReducer,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

    //store with persist state attached
 export const store = createStore(persistedReducer, "", compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

 export const persistor = persistStore(store);




