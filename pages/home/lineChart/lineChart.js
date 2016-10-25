/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes}  from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {render} from 'react-dom'
import styles from './lineChart.css';
import {Chart} from 'react-google-charts'

/**
 * See home/index.js for context on how this component is used.
 * The LineChart uses the react-google-charts component to draw the
 * line chart and displays all 5 emotions of the current line from the play.
 */
export class LineChart extends React.Component {
    //define the types used in this component
    static propTypes = {
        data: PropTypes.object.isRequired,
        position: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string]).isRequired,
        lines: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);

        //intialise the component state to initial values
        //min-max are the left, right constraints around the current position.
        this.state = {
            min: 0.0,
            max: 1.0,
            series: [
                ["line", "anger", "disgust", "fear", "joy", "sadness"],
                [0.0, 0, 0, 0, 0, 0]
            ]
        };
    }

    /**
     * transform the data into a format that google charts can handle.
     * @param nextProps
     * @returns {Array.<*>|*}
     */
    parseData(nextProps) {
        let rows;
        if (nextProps.data) {
            rows = Object.keys(nextProps.data).sort().map(key => {
                return parseFloat(nextProps.data[key]);
            });
        }

        //need to add the position as the first element so the chart knows where to drop this plot,
        rows = [nextProps.position].concat(rows);
        return rows;
    }

    /**
     * New props are coming into the component
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        //transform rows and add it to the series already in the chart.
        const rows = this.parseData(nextProps);
        let series = this.state.series;
        if (nextProps.position == this.lastPosition) {
            //replace existing entry in the series with the new one
            let index = series.findIndex((element) => element[0] == nextProps.position);
            if (index>=0) {
                //replace existing element with new one
                series.splice(index,1, rows);
            } else {
                //couldnt find entry. This should never be the cae
                //but just in case, we'll add it.
                series.push(rows);
            }
        } else {
            series.push(rows);
        }

        this.lastPosition = nextProps.position;
        //the following will cause render to be called
        this.setState({
            series: series,
        });
        setTimeout(() => {
            //in 300ms move the window of the chart up to surround the current position.
            this.setState({
                min: parseInt(nextProps.position) - 1,
                max: parseInt(nextProps.position) + 1,
            });
        }, 300)
    }

    /**
     * Render function does all the drawing.
     * @returns {XML}
     */
    render() {
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
                            pointSize : 4,
                            curveType: 'function', //'none', // or 'function'
                        }}
                        graph_id="Emotion Line Chart"
                        width="650px"
                        height="250px"

                    />
                </div>
            </div>
        );
    }
}

//Everything under here is redux connection stuff.
//Note that the redux connected component is exported by default.
// The "dumb" component is exported above and can be used for testing.

/**
 * attach the fetchEmotionalAnalysis to the props of the component
 * @param dispatch
 * @param ownProps
 * @returns {*}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({}, dispatch);
};

function mapStateToProps(state) {
    return {
        data: state.currentEmotion,
        position: state.playPosition,
        lines: state.play
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
