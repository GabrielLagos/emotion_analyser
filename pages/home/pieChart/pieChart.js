/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes}  from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {render} from 'react-dom'
import styles from './pieChart.css';
import {Chart} from 'react-google-charts'

export class PieChart extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        types: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.initState = this.initState.bind(this);
        this.state = {};
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
                    return [key, parseFloat(this.props.data[key])];
                })
            });
        }
    }

    componentDidMount() {
        this.initState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        initState(nextProps);
    }



    render() {
        if (this.state.columns == null || this.state.rows == null || this.props.title == null) {
            return (
                <h1>Can't render data.</h1>
            );
        }
        let columns = this.state && this.state.columns;
        let rows = this.state && this.state.rows;
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
                            sliceVisibilityThreshold: .2,
                            backgroundColor: 'transparent',
                            is3D: true
                        }}
                        graph_id="Emotion Chart"
                        width="300px"
                        height="300px"
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
    return bindActionCreators({}, dispatch);
};

function mapStateToProps(state) {
    return {
        types: state.types,
        data: state.data,
        title: state.title
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);
