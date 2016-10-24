/**
 * Created by gooba on 24/10/2016.
 */
import { takeEvery, takeLatest} from 'redux-saga'
import { call, put } from 'redux-saga/effects'
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
        case ANALYSE_EMOTION_ERROR:
            return DEFAULT_EMOTION;

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
            return action.payload;

        case ANALYSE_EMOTION:
        default:
            return '';
    }
};

function* analyseEmotionAsync (action) {
    try {
        const analysis = yield call(getEmotionAnalysis, action.payload);
        if (analysis.status == null || analysis.status == "ERROR") {
            yield put({
                type: ANALYSE_EMOTION_ERROR,
                payload: analysis.statusInfo
            });
        } else {
            yield put({
                type: ANALYSE_EMOTION,
                payload: analysis.docEmotions
            });
        }
    }
    catch(e) {
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

exports.fetchEmotionAnalysis = (text) => {
    return {
        type: FETCH_NEW_EMOTION,
        payload: text
    };
};
