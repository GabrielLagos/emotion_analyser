/**
 * Created by gooba on 24/10/2016.
 */
import {takeEvery, takeLatest} from 'redux-saga'
import {call, put} from 'redux-saga/effects'
import {getEmotionAnalysis} from '../pages/services/alchemyApi'

///CONSTANTS
const ANALYSE_EMOTION = 'ANALYSE_EMOTION';
const RESET_EMOTION = 'RESET_EMOTION';
const FETCH_NEW_EMOTION = "FETCH_NEW_EMOTION";
const ANALYSE_EMOTION_ERROR = "ANALYSE_EMOTION_ERROR";

///REDUCERS
let DEFAULT_EMOTION = {
    "anger": 0.0,
    "disgust": 0.0,
    "fear": 0.0,
    "joy": 0.0,
    "sadness": 0.0
};

// the initial seed
Math.seed = 6;

// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function (min=0, max=1) {
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

let randomEmotions = (position) => {
    Math.seed = position;
    return {
        "anger": Math.seededRandom(0, 1),
        "disgust": Math.seededRandom(0, 1),
        "fear": Math.seededRandom(0, 1),
        "joy": Math.seededRandom(0, 1),
        "sadness": Math.seededRandom(0, 1),
    };
};
//emotion analysis for current line
exports.currentEmotion = (state = DEFAULT_EMOTION, action) => {

    if (action.type == null) {
        return state;
    }

    switch (action.type) {
        //new emotion has come in. It is now the new emotional state
        case ANALYSE_EMOTION:
            return action.payload;

        //reset back to initial state
        case RESET_EMOTION:
            return DEFAULT_EMOTION;

        case ANALYSE_EMOTION_ERROR:
            return randomEmotions(action.payload.position);

        default:
            return state;
    }
};

exports.restStatus = (state = '', action) => {
    if (action.type == null) {
        return '';
    }

    switch (action.type) {
        case ANALYSE_EMOTION_ERROR:
            return `Error fetching from Alchemy API: ${action.payload.message}`;

        case ANALYSE_EMOTION:
        default:
            return '';
    }
};

function* analyseEmotionAsync(action) {
    try {
        const analysis = yield call(getEmotionAnalysis, action.payload.text);
        if (analysis.status == null || analysis.status == "ERROR") {
            yield put({
                type: ANALYSE_EMOTION_ERROR,
                payload: {
                    message: analysis.statusInfo,
                    position: action.payload.position
                }
            });
        } else {
            yield put({
                type: ANALYSE_EMOTION,
                payload: analysis.docEmotions
            });
        }
    }
    catch (e) {
        console.error(e);
        yield put({
            type: RESET_EMOTION
        });
    }
}

export function* emotionSaga() {
    yield* takeLatest(FETCH_NEW_EMOTION, analyseEmotionAsync);
}

exports.resetEmotion = () => {
    return {
        type: RESET_EMOTION
    };
};

exports.fetchEmotionAnalysis = (text, position) => {
    return {
        type: FETCH_NEW_EMOTION,
        payload: {text, position}
    };
};
