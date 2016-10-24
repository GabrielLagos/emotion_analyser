/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes}  from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {render} from 'react-dom'
import styles from './lineChart.css';
import {Chart} from 'react-google-charts'
import {fetchEmotionAnalysis} from '../../../reducers/emotion-reducer'

export class LineChart extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        position: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string]).isRequired,
        lines: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            min: 0.0,
            max: 1.0,
            series: [
                ["line", "anger", "disgust", "fear", "joy", "sadness"],
                [0.0, 0, 0, 0, 0, 0]
            ],
            columns: ["line", "anger", "disgust", "fear", "joy", "sadness"]
        };
    }

    parseData(nextProps) {

        let columns, rows;
        if (nextProps.types) {
            columns = Object.keys(nextProps.data).sort().map((key) => {
                return {
                    "type": "number",
                    "label": key
                }
            })
        }

        if (nextProps.data) {
            rows = Object.keys(nextProps.data).sort().map(key => {
                return parseFloat(nextProps.data[key]);
            });
        }

        rows = [nextProps.position].concat(rows);
        return {columns, rows};
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        const {columns, rows} = this.parseData(nextProps);
        let series = this.state.series;
        series.push(rows);
        this.setState({
            columns: columns,
            series: series,
        });
        setTimeout(() => {
            this.setState({
                min : parseInt(nextProps.position)-1,
                max : parseInt(nextProps.position)+1,
            });
        }, 300)
    }

    render() {
        /*
         if (this.state.columns == null || this.state.series == null) {
         return (
         <h1>Can't render data.</h1>
         );
         }
         console.log(`row data = ${JSON.stringify(rows, null, 4)}`);
         */
        // try {
        return (
            <div className={styles.wrapper}>
                <div className={styles.chartWrapper}>
                    <Chart
                        chartType="LineChart"
                        data={this.state.series}
                        options={{
                            title: '',
                            backgroundColor: 'transparent',
                            hAxis: {
                                viewWindow: {
                                    min: this.state.min,
                                    max: this.state.max
                                }
                            },
                            vAxis: {minValue: 0, maxValue: 1},
                            animation: {
                                duration: 600,
                                easing: 'linear'
                            },
                            curveType: 'none', //'none', // or 'function'
                        }}
                        graph_id="Emotion Line Chart"
                        width="650px"
                        height="250px"

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

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
