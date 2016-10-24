import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import Layout from '../../components/Layout';
import styles from './styles.css';
import PlayScroller from './playScroller/playScroller'
import PlayLine from './playLine/playLine'
import PieChart from './pieChart/pieChart'
import LineChart from './lineChart/lineChart'

export class HomePage extends React.Component {

    render() {
        return (
            <Layout className={styles.content}>
                <div className={styles.topLine}>
                    <PlayLine/>
                    <PlayScroller/>
                </div>
                <div className={styles.analytics}>
                    <LineChart/>
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
