import React, {PropTypes} from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import PlayScroller from './playScroller/playScroller'
import PlayLine from './playLine/playLine'

class HomePage extends React.Component {

    componentDidMount() {
//        document.title = title;
    }

    componentWillUnmount() {
    }


    render() {
        return (
            <Layout className={s.content}>
                <div className={s.topLine}>
                    <PlayLine/>
                    <PlayScroller/>
                </div>
                <div className={s.analytics}/>
            </Layout>
        );
    }

}

export default HomePage;
