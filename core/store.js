
import {createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {play, playPosition} from '../assets/play-reducer'
import createSagaMiddleware from 'redux-saga'

import {emotionSaga, currentEmotion, restStatus} from '../reducers/emotion-reducer'

//these reducers combine all the state needed by the app
//They get placed in the store and then Redux manages them for me.
let reducers = combineReducers({
    play,
    playPosition,
    currentEmotion,
    restStatus
});

//middleware used to handle async ops. Saga rocks.
const sagaMiddleware = createSagaMiddleware();

//create the store and add all the middleware. Note I use the devtools
//to see the state in the chrome dev tools during development.
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));

//start the saga monitor.
sagaMiddleware.run(emotionSaga);

//make the store available to the rest of the application.
export default store;
