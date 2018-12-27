import React, { Component } from 'react';
import Gallery from './Gallery';
import AddPhoto from './Admin/AddPhoto';
import {Route, Link, Switch} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { NavMenu } from './NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalContainer, ModalRoute } from 'react-router-modal';

class Main extends Component {
    state = { 
        loading: true,
    };

    componentDidMount() {
        this.props.startLoadingPost().then(() => {
            this.setState({loading: false})
        })
    }

    // Close the modal on location click
    previousLocation = this.props.location;

    componentWillUpdate(nextProps) {
      const { location } = this.props;
      // set previousLocation if props.location is not modal
      if (
        nextProps.history.action !== "POP" &&
        (!location.state || !location.state.modal)
      ) {
        this.previousLocation = this.props.location;
      }
    }

    render() {
        const { location } = this.props;

        const isModal = !!(
        location.state &&
        location.state.modal &&
        this.previousLocation !== location
        ); 

        return (
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path="/" render={() => (
                        <div>
                            <Gallery {...this.props} />
                        </div>
                    )}/>

                    <Route path="/AddPhoto" render = {({history}) => (
                        <AddPhoto {...this.props} onHistory={history}/>
                    )}/>
                </Switch>
                <div className="site-footer">
                    <FontAwesomeIcon name="fa-paw"/> Built by a wonderful developer for Asana.
                </div>
            </div>
        )
    }
}

export default Main