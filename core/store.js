
import {createStore, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {play, playPosition} from '../assets/play-reducer'

let reducers = combineReducers({
    play,
    playPosition,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
