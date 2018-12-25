import React, { Component } from 'react';
import AsanaGallery from './Gallery/Gallery';
import AddPhoto from './Admin/AddPhoto';
import {Route, Link, Switch} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { NavMenu } from './NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import Modal from "./Modal";
import Single from './Gallery/Single';
import "../styles/modal.css"


class Main extends Component {
    state = { 
        loading: true,
    };

    componentDidMount() {
        this.props.startLoadingPost().then(() => {
            this.setState({loading: false})
        })
    }

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
     ); // not initial render

        return (
            <div>
                <NavMenu />
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <Switch location={isModal ? this.previousLocation : location}>
                            <Route exact path="/" render={() => (
                                <div>
                                    <AsanaGallery {...this.props} />
                                </div>
                            )}/>

                            <Route path="/AddPhoto" render = {({history}) => (
                                <AddPhoto {...this.props} onHistory={history}/>
                            )}/>
                            </Switch>
                            
                            {isModal ?  <Route exact path="/single/:id" render = {(params) => (
                            <Single loading={this.state.loading} {...this.props} {...params}/> )}/> : null }
                        </Col>
                    </Row>
                </Grid>
                <div className="site-footer">
                   <FontAwesomeIcon name="fa-paw"/> Built by a wonderful developer for Asana.
                </div>

            <ModalContainer />
            </div>
        )
    }
}

export default Main