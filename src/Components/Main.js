import React, { Component } from 'react';
import AsanaGallery from './Gallery/AsanaGallery';
import AddPhoto from './Admin/AddPhoto';
import {Route, Link} from 'react-router-dom';
import Single from './Gallery/Single';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { NavMenu } from './NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Main extends Component {
    state = { 
        loading: true,
    };

    componentDidMount() {
        this.props.startLoadingPost().then(() => {
            this.setState({loading: false})
        })
    }

    render() {
        const { openModal } = this.state;
        return (
            <div>
                <NavMenu />
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <Route exact path="/" render={() => (
                                <div>
                                    <AsanaGallery {...this.props} />
                                </div>
                            )}/>

                            <Route path="/AddPhoto" render = {({history}) => (
                                <AddPhoto {...this.props} onHistory={history}/>
                            )}/>

                            <Route exact path="/single/:id" render = {(params) => (
                                <Single loading={this.state.loading} {...this.props} {...params}/> 
                            )}/>
                        </Col>
                    </Row>
                </Grid>
                <div className="site-footer">
                   <FontAwesomeIcon name="fa-paw"/> Built by a wonderful developer for Asana.
                </div>
            </div>
        )
    }
}

export default Main