import React, { Component } from 'react';
import Gallery from './Gallery';
import {Route, Switch, Link} from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import Footer from './Footer';

class Main extends Component {
    state = { 
        loading: true,
    };

    componentDidMount() {
        this.props.startLoadingPost().then(() => {
            this.setState({loading: false});
        })
    }

    render() {
        return (
            <>  
                <Grid container>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <>
                                <Gallery {...this.props} />
                            </>
                        )}/>
                    </Switch>
                </Grid>
                <Footer />
            </>
        )
    }
}

export default Main