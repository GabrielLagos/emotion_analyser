/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import styles from './playScroller.css';
import {moveToPosition} from '../../../assets/play-reducer'

export class PlayScroller extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        position: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string]).isRequired,
        lines: PropTypes.array.isRequired,
        changePosition: PropTypes.func.isRequired,
    };

    componentDidMount() {
        window.componentHandler.upgradeElement(this.root);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.root);
    }

    onChange(event) {
        //check for target property. Unit test will only have a single value
        if (event.target) {
            let value = event.target.value;
            this.props.changePosition(value);
        } else {
            this.props.changePosition(event);
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <p style={{width: '100%', position: 'relative'}}>
                    <input ref={node => (this.root = node)}
                           className="mdl-slider mdl-js-slider" type="range" onChange={this.onChange}
                           min="0" max={this.props.lines.length} value={this.props.position} tabIndex="0"/>
                </p>
            </div>
        );
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        changePosition: moveToPosition
    }, dispatch);
};

function mapStateToProps(state) {
    return {
        position: state.playPosition,
        lines: state.play
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayScroller);
