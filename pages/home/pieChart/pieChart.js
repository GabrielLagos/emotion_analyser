/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes}  from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {render} from 'react-dom'
import styles from './pieChart.css';
import {Chart} from 'react-google-charts'
import {fetchEmotionAnalysis} from '../../../reducers/emotion-reducer'

export class PieChart extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        types: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        position: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string]).isRequired,
        lines: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.initState = this.initState.bind(this);
        this.state = {};
    }

    parseData() {
        let columns, rows;
        if (this.props.types) {
            columns = this.props.types.map((t) => {
                return {
                    "type": t[0],
                    "label": t[1]
                }
            })
        }

        if (this.props.data) {
            rows = Object.keys(this.props.data).map(key => {
                return [key, parseFloat(this.props.data[key]) * 100.0];
            });
        }

        return {columns, rows};
    }

    initState(props) {
        if (props.types) {
            this.setState({
                columns: props.types.map((t) => {
                    return {
                        "type": t[0],
                        "label": t[1]
                    }
                })
            });
        }

        if (props.data) {
            this.setState({
                rows: Object.keys(this.props.data).map(key => {
                    return [key, parseFloat(this.props.data[key]) * 100.0];
                })
            });
        }
    }

    componentDidMount() {
        this.initState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        /*this.initState(nextProps);*/

        if (this.lastPosition != nextProps.position) {
            this.lastPosition = nextProps.position;
            try {
                let text = nextProps.lines[nextProps.position].text_entry;
                this.props.fetchEmotionAnalysis(text, nextProps.position);
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    render() {
        if (this.state.columns == null || this.state.rows == null || this.props.title == null) {
            return (
                <h1>Can't render data.</h1>
            );
        }
        const {columns, rows} = this.parseData();

        // try {
        return (
            <div className={styles.wrapper}>
                <div className={styles.chartWrapper}>
                    <Chart
                        chartType="PieChart"
                        columns={columns}
                        rows={rows}
                        options={{
                            title: this.props.title,
                            sliceVisibilityThreshold: 0,
                            backgroundColor: 'transparent',
                            is3D: true
                        }}
                        graph_id="Emotion Chart"
                        width="250px"
                        height="250px"
                        legend_toggle
                    />
                </div>
            </div>
        );
        /*
         }
         catch (e) {
         console.error(e);
         return null;
         }
         */
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        fetchEmotionAnalysis
    }, dispatch);
};

function mapStateToProps(state) {
    return {
        data: state.currentEmotion,
        position: state.playPosition,
        lines: state.play
        /*
         types: state.types,
         title: state.title
         */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);
