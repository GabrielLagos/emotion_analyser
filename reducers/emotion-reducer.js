/**
 * Created by gooba on 24/10/2016.
 */
import {takeLatest} from 'redux-saga'
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

//I nabbed this of stackoverflow to have a controlled stream of random numbers.
//Unfortunately it didnt work too well and the chart wasnt playing nice for
// some reason.
//
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function (min=0, max=1) {
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
};

/**
 * This is used in the event of an error coming back from Alchemy which happened with alarming regularity.
 * @param position
 * @returns {{anger, disgust, fear, joy, sadness}}
 */
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

        //when an error action is detected, we use the randomEmotions generator above
        case ANALYSE_EMOTION_ERROR:
            return randomEmotions(action.payload.position);

        default:
            return state;
    }
};

/**
 * This allows messages to be sent to the front end.
 * @param state
 * @param action
 * @returns {*}
 */
exports.restStatus = (state = '', action) => {
    if (action.type == null) {
        return '';
    }

    switch (action.type) {
        //Note the same action as above! We set the message thrown by the error from alchemy so the user can see it.
        case ANALYSE_EMOTION_ERROR:
            return `Error fetching from Alchemy API: ${action.payload.message}`;

        //all other cases we simply clear the restStatus
        case ANALYSE_EMOTION:
        default:
            return '';
    }
};

/**
 * This generator function is used by Saga to call the emotion api server.
 * The yield calls allow Saga to dispatch actions one after the other.
 * @param action
 */
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

/**
 * this function is used by Saga to monitor the actions flowing through Redux.
 * If it sees the FETCH_NEW_EMOTION, then the appropriate function is called.
 * Note that takeLatest cancels any queued actions with the same id. This helps
 * us to spare the erver from slamming it with too many hits.
 */
export function* emotionSaga() {
    yield* takeLatest(FETCH_NEW_EMOTION, analyseEmotionAsync);
}
/**
 * simple action creator to reset emotion back to the zero state.
 * @returns {{type: string}}
 */
exports.resetEmotion = () => {
    return {
        type: RESET_EMOTION
    };
};

/**
 * This call kicks of the train above to get data from the Alchemy API
 * @param text
 * @param position
 * @returns {{type: string, payload: {text: *, position: *}}}
 */
exports.fetchEmotionAnalysis = (text, position) => {
    return {
        type: FETCH_NEW_EMOTION,
        payload: {text, position}
    };
};
