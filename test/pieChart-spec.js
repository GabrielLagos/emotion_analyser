/**
 * Created by gooba on 23/10/2016.
 */
import chai, {expect} from 'chai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {PieChart} from '../pages/home/pieChart/pieChart'

chai.should();

describe('<PieChart/>', () => {
    let data = {
        "anger": "0.325268",
        "disgust": "0.368537",
        "fear": "0.142631",
        "joy": "0.402121",
        "sadness": "0.160611"
    };

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
        }];

    it('should format data properly', () => {
        const chart = mount(
            <PieChart data={data} types={[['string', 'emotion'], ['number', 'scale']]} title="Emotional Analysis"
                      lines={lines} position={5}/>
        );

        expect(chart.state()).to.have.property('columns');
        expect(chart.state()).to.have.property('rows');
        expect(chart.state().columns).to.have.length(2);
        expect(chart.state().rows).to.have.length(5);

        let keys = chart.state().rows.map(e => e[0]);
        /*
         "anger": "0.325268",
         "disgust": "0.368537",
         "fear": "0.142631",
         "joy": "0.402121",
         "sadness": "0.160611"
         */
        expect(keys).to.have.length(5);
        expect(keys).to.have.members(["disgust", "anger", "fear", "joy", "sadness"]);
    });
});

