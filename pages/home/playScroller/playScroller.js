/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import styles from './playScroller.css';
import {moveToPosition} from '../../../assets/play-reducer'
import {fetchEmotionAnalysis} from '../../../reducers/emotion-reducer'
import MdPlay from 'react-icons/lib/md/play-circle-filled';
import MdPause from 'react-icons/lib/md/pause-circle-outline'

/**
 * PlayScroller is responsible for displaying the scroll bar and play/pause buttons.
 * IT also moves the thumb automatically if the position from the state is modified.
 */
export class PlayScroller extends React.Component {
    constructor(props) {
        super(props);

        //bind all methods to the this operator
        this.onChange = this.onChange.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.incrementPosition = this.incrementPosition.bind(this);
        this.analyseEmotion = this.analyseEmotion.bind(this);

        //in paused mode to begin with
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

    //if the scroll bar is moved then update the position in the state
    onChange(event) {
        let value;
        //check for target property. Unit test will only have a single value
        if (event.target) {
            value = event.target.value;
            this.props.changePosition(value);
        } else {
            value = event;
            this.props.changePosition(value);
        }
        this.analyseEmotion(value);
    }

    /**
     * This method is called by the interval timer. It advance the play position 1 by 1 until the end of the play
     */
    incrementPosition() {
        let position = parseInt(this.props.position);
        this.props.changePosition(position + 1);
        this.analyseEmotion(position+1);
    }

    analyseEmotion(position) {
        let text = this.props.lines[position].text_entry;
        this.props.fetchEmotionAnalysis(text, position);
    }
    /**
     * this kicks of the interval timer
     */
    play() {
        this.setState({playing: true});
        this.cancelTimer = setInterval(this.incrementPosition, 3000);
        this.incrementPosition();
    }

    /**
     * stops playback of the play
     */
    pause() {
        this.setState({playing: false});
        clearInterval(this.cancelTimer);
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

//REDUX STUFF BELOW
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        fetchEmotionAnalysis: fetchEmotionAnalysis,
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
