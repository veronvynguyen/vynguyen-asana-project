import React, { Component } from 'react';
import Gallery from './Gallery';
import AddPhoto from './Admin/AddPhoto';
import About from './About';
import {Route, Switch, Link} from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import NavMenu from './NavMenu';
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
                <NavMenu />

                <Grid container>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <>
                                <Gallery {...this.props} />
                            </>
                        )}/>

                        <Route path="/About" render={() => (
                            <>
                                <About {...this.props} />
                            </>
                        )}/>

                        <Route path="/AddPhoto" render = {({history}) => (
                            <AddPhoto {...this.props} onHistory={history}/>
                        )}/>
                    </Switch>
                </Grid>

                <Footer />
            </>
        )
    }
}

export default Main