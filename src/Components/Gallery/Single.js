import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import {ListGroup, ListGroupItem} from 'reactstrap';

const styles = {
    card: {
      minWidth: 345,
      maxWidth: 345,
      height: "fit-content",
      maxHeight: "calc(100vh - 100px)",
      textAlign: "center",
      overflow: "scroll",
      
    },
    media: {
      maxHeight: 500,
      height: 350
    },
  };

  
export class Single extends Component {
    render() {
        const { classes, theme } = this.props;
        const {match, history, posts} = this.props;
        const id = Number(match.params.id);
        const post = posts.find((post) => post.id === id);
        const index = this.props.posts.findIndex((post) => post.id === id);

        const back = e => {
            e.stopPropagation();
            history.goBack();
        };

        if (this.props.loading === true) {
            return <div className="loader"> ...loading </div>
        } else if (post) {
            return <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <div onClick={back} class="modal-background" >
                    <div className="modal-container justify-"
                        style={{
                            position: "fixed",
                            display: "flex",
                            top: 25,
                        }}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                image={post.imageLink}
                                title={post.name}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h3" component="h2">
                                    {post.name}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {post.breed}
                                </Typography>
                                <Typography component="li">
                                    <ul className="list-group">
                                        <li className="list-group-item"><b>ID </b> <br></br> {post.id} </li>
                                        <li className="list-group-item"><b>Age </b> <br></br> {post.age} </li>
                                        <li className="list-group-item"><b>Gender </b> <br></br> {post.gender} </li>
                                        <li className="list-group-item"><b>Personality </b> <br></br> {post.personality} </li>
                                        <li className="list-group-item"><b>Sheltered at </b> <br></br> {post.shelterAddress} </li>
                                        <li className="list-group-item"><b>Shelter's phone </b> <br></br> {post.shelterPhone} </li>
                                        <li className="list-group-item"></li>
                                    </ul>
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                         </Card>
                    </div>
                </div>
            </Grid>
        } else {
            return <h1> ...no post found </h1>
        }
    }
}

Single.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Single);