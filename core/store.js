
import {createStore, combineReducers} from 'redux';
import {play, playPosition} from '../assets/play-reducer'

let reducers = combineReducers({
    play,
    playPosition,
});

const store = createStore(reducers);

export default store;
