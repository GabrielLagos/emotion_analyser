/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import cx from 'classnames';
import Header from './Header';
import Footer from '../Footer';
import styles from './Layout.css';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import Notifications, {notify} from 'react-notify-toast';

export class Layout extends React.Component {

    static propTypes = {
        className: PropTypes.string,
    };

    componentDidMount() {
//    window.componentHandler.upgradeElement(this.root);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.restStatus && nextProps.restStatus.length > 0) {
            notify.show(nextProps.restStatus);
        }
    }

    componentWillUnmount() {
//    window.componentHandler.downgradeElements(this.root);
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout" ref={node => (this.root = node)}>
                <Notifications/>
                <div className={cx("mdl-layout__inner-container", styles["mdl-layout__inner-container"])}>
                    <Header />
                    <main className={cx("mdl-layout__content", styles["mdl-layout__content"])}>
                        <div {...this.props} className={cx(styles.content, this.props.className)}/>
                        <Footer />
                    </main>
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
        restStatus: state.restStatus,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
