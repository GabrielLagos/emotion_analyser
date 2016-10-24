/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import styles from './playLine.css';
import classNames from 'classnames'
import {Motion, spring} from 'react-motion';

export class PlayLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leaving: false,
            entering: false,
            currentLine: '',
        }
    }

    static propTypes = {
        position: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string]).isRequired,
        lines: PropTypes.array.isRequired,
    };

    componentDidMount() {
        let text = this.props.lines[this.props.position].text_entry;
        this.setState({currentLine: text});
    }


    componentWillReceiveProps(nextProps) {
        let nextText = nextProps.lines[nextProps.position].text_entry;
        if (this.state.currentLine != nextText) {
            //new text to be shown
            this.setState({leaving: true});
            setTimeout(() => this.setState({
                leaving: false,
                entering: true,
                currentLine: nextText,
            }), 800);
            setTimeout(() => this.setState({
                entering: false,
            }), 1500);
        }
    }

    render() {
         let currentBlock = {};
         if (this.props.lines && this.props.position && this.props.lines[this.props.position]) {
             currentBlock = this.props.lines[this.props.position];
         }

        return (
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <h3>{currentBlock.speaker}</h3>
                    <pre><b>Line</b> {currentBlock.line_number}</pre>
                </div>
                <Motion style={{x: spring(this.state.leaving ? 0 : 1)}}>
                {({x}) =>
                    <div className={classNames(styles.writing)} style={{
                        opacity: x
                    }}>
                        {this.state.currentLine}
                    </div>
                }
                </Motion>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({}, dispatch);
};

function mapStateToProps(state) {
    return {
        position: state.playPosition,
        lines: state.play
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayLine);
