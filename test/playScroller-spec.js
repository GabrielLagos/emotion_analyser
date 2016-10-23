/**
 * Created by gooba on 23/10/2016.
 */
import chai, {expect} from 'chai';
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon'
import {PlayLine} from '../pages/home/playLine/playLine'
import {PlayScroller} from '../pages/home/playScroller/playScroller'

chai.should();

describe('<PlayLine/>', () => {
    it('Render correct line', () => {
        const lines = [
            {
                "line_id": 1,
                "play_name": "Henry IV",
                "speech_number": "",
                "line_number": "",
                "speaker": "",
                "text_entry": "ACT I"
            }, {
                "line_id": 2,
                "play_name": "Henry IV",
                "speech_number": "",
                "line_number": "",
                "speaker": "",
                "text_entry": "SCENE I. London. The palace."
            }, {
                "line_id": 3,
                "play_name": "Henry IV",
                "speech_number": "",
                "line_number": "",
                "speaker": "",
                "text_entry": "Enter KING HENRY, LORD JOHN OF LANCASTER, the EARL of WESTMORELAND, SIR WALTER BLUNT, and others"
            }, {
                "line_id": 4,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.1",
                "speaker": "KING HENRY IV",
                "text_entry": "So shaken as we are, so wan with care,"
            }, {
                "line_id": 5,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.2",
                "speaker": "KING HENRY IV",
                "text_entry": "Find we a time for frighted peace to pant,"
            }, {
                "line_id": 6,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.3",
                "speaker": "KING HENRY IV",
                "text_entry": "And breathe short-winded accents of new broils"
            }, {
                "line_id": 7,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.4",
                "speaker": "KING HENRY IV",
                "text_entry": "To be commenced in strands afar remote."
            }, {
                "line_id": 8,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.5",
                "speaker": "KING HENRY IV",
                "text_entry": "No more the thirsty entrance of this soil"
            }, {
                "line_id": 9,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.6",
                "speaker": "KING HENRY IV",
                "text_entry": "Shall daub her lips with her own children's blood;"
            }, {
                "line_id": 10,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.7",
                "speaker": "KING HENRY IV",
                "text_entry": "Nor more shall trenching war channel her fields,"
            }, {
                "line_id": 11,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.8",
                "speaker": "KING HENRY IV",
                "text_entry": "Nor bruise her flowerets with the armed hoofs"
            }, {
                "line_id": 12,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.9",
                "speaker": "KING HENRY IV",
                "text_entry": "Of hostile paces: those opposed eyes,"
            }
        ];
        const scroller = shallow(
            <PlayLine
                position={3}
                lines={lines}/>
        );

        expect(scroller.find('div > div').text()).to.contain("So shaken as we are");
    });

    it('Render scroller', () => {
        const lines = [
            {
                "line_id": 1,
                "play_name": "Henry IV",
                "speech_number": "",
                "line_number": "",
                "speaker": "",
                "text_entry": "ACT I"
            }, {
                "line_id": 2,
                "play_name": "Henry IV",
                "speech_number": "",
                "line_number": "",
                "speaker": "",
                "text_entry": "SCENE I. London. The palace."
            }, {
                "line_id": 3,
                "play_name": "Henry IV",
                "speech_number": "",
                "line_number": "",
                "speaker": "",
                "text_entry": "Enter KING HENRY, LORD JOHN OF LANCASTER, the EARL of WESTMORELAND, SIR WALTER BLUNT, and others"
            }, {
                "line_id": 4,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.1",
                "speaker": "KING HENRY IV",
                "text_entry": "So shaken as we are, so wan with care,"
            }, {
                "line_id": 5,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.2",
                "speaker": "KING HENRY IV",
                "text_entry": "Find we a time for frighted peace to pant,"
            }, {
                "line_id": 6,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.3",
                "speaker": "KING HENRY IV",
                "text_entry": "And breathe short-winded accents of new broils"
            }, {
                "line_id": 7,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.4",
                "speaker": "KING HENRY IV",
                "text_entry": "To be commenced in strands afar remote."
            }, {
                "line_id": 8,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.5",
                "speaker": "KING HENRY IV",
                "text_entry": "No more the thirsty entrance of this soil"
            }, {
                "line_id": 9,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.6",
                "speaker": "KING HENRY IV",
                "text_entry": "Shall daub her lips with her own children's blood;"
            }, {
                "line_id": 10,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.7",
                "speaker": "KING HENRY IV",
                "text_entry": "Nor more shall trenching war channel her fields,"
            }, {
                "line_id": 11,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.8",
                "speaker": "KING HENRY IV",
                "text_entry": "Nor bruise her flowerets with the armed hoofs"
            }, {
                "line_id": 12,
                "play_name": "Henry IV",
                "speech_number": 1,
                "line_number": "1.1.9",
                "speaker": "KING HENRY IV",
                "text_entry": "Of hostile paces: those opposed eyes,"
            }
        ];
        const onChanged = sinon.spy();
        const scroller = shallow(
            <PlayScroller
                position={3}
                lines={lines} changePosition={(onChanged)}/>
        );

        let slider = scroller.find('input');
        slider.simulate('change', 1);

        expect(onChanged).to.have.property('callCount', 1);
    });

});