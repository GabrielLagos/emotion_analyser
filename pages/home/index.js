import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import Layout from '../../components/Layout';
import styles from './styles.css';
import PlayScroller from './playScroller/playScroller'
import PlayLine from './playLine/playLine'
import PieChart from './pieChart/pieChart'

export class HomePage extends React.Component {

    componentDidMount() {
//        document.title = title;
    }

    componentWillUnmount() {
    }

    render() {
/*
        let data = {
            "anger": "0.325268",
            "disgust": "0.368537",
            "fear": "0.142631",
            "joy": "0.402121",
            "sadness": "0.160611"
        };
*/
        return (
            <Layout className={styles.content}>
                <div className={styles.topLine}>
                    <PlayLine/>
                    <PlayScroller/>
                </div>
                <div className={styles.analytics}>
                    {/*<PieChart title="Emotion Analysis" data={data} types={[['string', 'emotion'], ['number', 'scale']]} />*/}
                    <PieChart title="Emotion Analysis" types={[['string', 'emotion'], ['number', 'scale']]}/>
                </div>
            </Layout>
        );
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({}, dispatch);
};

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
