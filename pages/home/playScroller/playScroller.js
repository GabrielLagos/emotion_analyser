/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import styles from './playScroller.css';
import {moveToPosition} from '../../../assets/play-reducer'

export class PlayScroller extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        position: PropTypes.number.isRequired,
        lines: PropTypes.array.isRequired,
        changePosition: PropTypes.func.isRequired,
    };

    componentDidMount() {
        window.componentHandler.upgradeElement(this.root);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.root);
    }

    onChange(value) {
        console.log(`\nvalue = ${value}`);
        this.props.changePosition(value);
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <p style={{width: '100%'}}>
                    <input ref={node => (this.root = node)}
                           className="mdl-slider mdl-js-slider" type="range" onChange={this.onChange}
                           min="0" max={this.props.lines.length} tabIndex={this.props.position} value={this.props.lines.length}/>
                </p>
            </div>
        );
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changePosition : moveToPosition
    }
};

function mapStateToProps(state) {
    return {
        position: state.playPosition,
        lines: state.play
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayScroller);
