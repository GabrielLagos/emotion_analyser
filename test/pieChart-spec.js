/**
 * Created by gooba on 23/10/2016.
 */
import chai, {expect} from 'chai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {PieChart} from '../pages/home/pieChart/pieChart'

chai.should();


describe('<PieChart/>',  () => {
    let data = {
        "anger": "0.325268",
        "disgust": "0.368537",
        "fear": "0.142631",
        "joy": "0.402121",
        "sadness": "0.160611"
    };
    it('should format data properly', () => {
        const chart = shallow(
            <PieChart data={data} types={[['string', 'emotion'], ['number', 'scale']]} title="Emotional Analysis" />
        );

        expect(chart.state().columns).to.have.length(2);
        expect(chart.state().rows).to.have.length(5);
    });
});

/*
* "docEmotions": {
 "anger": "0.325268",
 "disgust": "0.368537",
 "fear": "0.142631",
 "joy": "0.402121",
 "sadness": "0.160611"
 }*/