import { applyMiddleware, combineReducers, createStore } from "redux";

import PokemonesReducer from "./reducers/poke.reducer";
import thunk from "redux-thunk";

const RootReducers = combineReducers({
    pokemones: PokemonesReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function generateStore(){
    const store = createStore(RootReducers,composeEnhancers(applyMiddleware(thunk)));
 return store;
}