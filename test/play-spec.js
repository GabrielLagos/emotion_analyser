import chai, {expect} from 'chai';
chai.should();

import store from '../core/store'
import {moveToPosition, resetPosition} from '../assets/play-reducer'

describe('initial state', () => {
    let state = store.getState();
    it('play should have 3205 lines loaded on startup', () => {
        state.should.have.property('play').with.length(3205);
    });
    it('playPosition defined', () => {
        state.should.have.property('playPosition');
    });
    it('playPosition is 1', () => {
        expect(state.playPosition).to.equal(1);
    });

});

describe('actions', () => {
    var state = store.getState();
    let {playPosition} = state;
    let playPosition100;

    store.dispatch(moveToPosition(100), () => {
        playPosition100 = store.getState().playPosition;

        it('playPosition is 0', () => {
            expect(playPosition).to.equal(0);
        });

        it('playPosition has moved to 100', () => {
            state = store.getState();
            expect(playPosition100).to.equal(100);
        });

        store.dispatch(resetPosition(), () => {
            it('reset playPosition is 0', () => {
                expect(store.getState().playPosition).to.equal(0);
            });

        });

    });

});