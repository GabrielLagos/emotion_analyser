/**
 * Created by gooba on 23/10/2016.
 */
///CONSTANTS
const CHANGE_POSITION = 'CHANGE_POSITION';
const RESET_POSITION = 'RESET_POSITION';

///REDUCERS

//read play in at start up and make it available to the store.
//this is a readonly store (no actions)
const henryIVLines = require('./play.json');
exports.play = (state = henryIVLines) => {
    return state;
};

//where is user in the play
exports.playPosition = (state = 1, action) => {
    let playPosition = state;

    switch (action.type) {
        case CHANGE_POSITION:
            playPosition = action.payload;
            break;
        case RESET_POSITION:
            playPosition =0;
            break;
        default:
            playPosition =state;
    }

    return playPosition;
};

///Actions

exports.moveToPosition = (newPosition) => {
    return {
        type: CHANGE_POSITION,
        payload: newPosition
    };
};

exports.resetPosition = () => {
    return {
        type: RESET_POSITION
    };
};
