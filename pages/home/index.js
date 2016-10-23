import React, {PropTypes} from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import PlayScroller from './playScroller/playScroller'
import PlayLine from './playLine/playLine'
import {PieChart} from './pieChart/pieChart'

class HomePage extends React.Component {

    componentDidMount() {
//        document.title = title;
    }

    componentWillUnmount() {
    }


    render() {
        let data = {
            "anger": "0.325268",
            "disgust": "0.368537",
            "fear": "0.142631",
            "joy": "0.402121",
            "sadness": "0.160611"
        };
        return (
            <Layout className={s.content}>
                <div className={s.topLine}>
                    <PlayLine/>
                    <PlayScroller/>
                </div>
                <div className={s.analytics}>
                    <PieChart title="Emotion Analysis" data={data} types={[['string', 'emotion'], ['number', 'scale']]} />
                </div>
            </Layout>
        );
    }

}

export default HomePage;
