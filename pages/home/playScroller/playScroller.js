/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import styles from './playScroller.css';
import {moveToPosition} from '../../../assets/play-reducer'
import MdPlay from 'react-icons/lib/md/play-circle-filled';
import MdPause from 'react-icons/lib/md/pause-circle-outline'

export class PlayScroller extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.incrementPosition = this.incrementPosition.bind(this);

        this.state = {
            playing: false
        }
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

    pause() {
        this.setState({playing: false});
        clearInterval(this.cancelTimer);
    }

    incrementPosition() {
        let position = parseInt(this.props.position);
        this.props.changePosition(position + 1)
    }

    play() {
        this.setState({playing: true});
        this.cancelTimer = setInterval(this.incrementPosition, 2000);
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.state.playing?
                    <MdPause onClick={this.pause} size={42} className={styles.playIcon}/> :
                    <MdPlay onClick={this.play} size={42} className={styles.playIcon}/>}

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
