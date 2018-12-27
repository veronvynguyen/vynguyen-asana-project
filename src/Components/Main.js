import React, { Component } from 'react';
import Gallery from './Gallery';
import AddPhoto from './Admin/AddPhoto';
import {Route, Link, Switch} from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';

class Main extends Component {
    state = { 
        loading: true,
    };

    componentDidMount() {
        this.props.startLoadingPost().then(() => {
            this.setState({loading: false});
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
        <>
            <Grid container>
        
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
                
                    {/* <div className="site-footer">
                        <p>Built by a wonderful developer for Asana.</p>
                    </div> */}
               
            </Grid>
            </>
        )
    }
}

export default Main