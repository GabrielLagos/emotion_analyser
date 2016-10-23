/**
 * Created by gooba on 23/10/2016.
 */
import React, {PropTypes} from 'react';
import styles from './playLine.css';

export class PlayLine extends React.Component {
    static propTypes = {
        position: PropTypes.number.isRequired,
        lines : PropTypes.array.isRequired,
    };

    componentDidMount() {
    }

    render() {

        let currentLine = this.props.lines[this.props.position].text_entry;

        return (
            <div className={styles.wrapper}>
                <p>
                    <span className={styles.fancyWriting}>{currentLine}</span>
                </p>
            </div>
        );
    }

}

export default PlayLine;
