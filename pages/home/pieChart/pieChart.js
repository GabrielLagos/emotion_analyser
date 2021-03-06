/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes}  from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {render} from 'react-dom'
import styles from './pieChart.css';
import {Chart} from 'react-google-charts'

/**
 * See home/index.js for context on how this component is used.
 * The PieChart uses the react-google-charts component to draw the
 * pie chart and displays all 5 emotions of the current line from the play.
 */
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
                return [key, parseFloat(this.props.data[key])];
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

    render() {
        if (this.state.columns == null || this.state.rows == null || this.props.title == null) {
            return (
                <h1>Can't render data.</h1>
            );
        }
        const {columns, rows} = this.parseData();

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
                        width="350px"
                        height="250px"
                        legend_toggle
                    />
                </div>
            </div>
        );
    }
}

//REDUX Stuff below

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

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);
