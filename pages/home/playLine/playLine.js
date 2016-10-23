/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import styles from './playLine.css';
import classNames from 'classnames'
export class PlayLine extends React.Component {
    static propTypes = {
        position: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string]).isRequired,
        lines : PropTypes.array.isRequired,
    };

    componentDidMount() {
    }

    render() {
        let currentLine = '';
        if (this.props.lines && this.props.position && this.props.lines[this.props.position]) {
            currentLine = this.props.lines[this.props.position].text_entry;
        }

        return (
            <div className={styles.wrapper}>
                <div className={styles.writing}>
                    {currentLine}
                </div>
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
