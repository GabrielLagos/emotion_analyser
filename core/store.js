
import {createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {play, playPosition} from '../assets/play-reducer'
import createSagaMiddleware from 'redux-saga'

import {emotionSaga, currentEmotion, restStatus} from '../reducers/emotion-reducer'

let reducers = combineReducers({
    play,
    playPosition,
    currentEmotion,
    restStatus
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(emotionSaga);

export default store;
