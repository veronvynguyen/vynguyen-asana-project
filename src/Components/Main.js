import React, { Component } from 'react';
import Gallery from './Gallery';
import AddPhoto from './Admin/AddPhoto';
import {Route, Switch, Link} from 'react-router-dom';
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

    render() {
        return (
            <>  
                <Grid container>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <div>
                                    <Gallery {...this.props} />
                                </div>
                            )}/>

                            <Route path="/AddPhoto" render = {({history}) => (
                                <AddPhoto {...this.props} onHistory={history}/>
                            )}/>
                        </Switch>
                
                </Grid>
                <div className="site-footer">
                    <p>© Built by a wonderful developer for <b><a href="https://www.asana.com">Asana.</a></b></p>
                </div>  
            </>
        )
    }
}

export default Main