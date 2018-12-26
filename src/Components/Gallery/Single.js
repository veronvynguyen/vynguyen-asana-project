import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
<<<<<<< HEAD
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
=======
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
    card: {
        display: 'flex',
        background: '#f5f5f5'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
      //  width: 151,
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
      },
      playIcon: {
        height: 38,
        width: 38,
      },
  });
>>>>>>> e93b788283faba97992a1e303afee26c6958798e

  
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
<<<<<<< HEAD
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
=======
                <div onClick={back} class="modal-container" >
                    <div className="modal"
                        style={{
                            position: "fixed",
                            display: "flex",
                           // background: "#fff",
                            top: 25,
                            left: "10%",
                            right: "10%",
                            padding: 15,
                            margin: "0 auto",
                        }}>
                            <Card className={classes.card}>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        Live From Space
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Mac Miller
                                    </Typography>
                                    </CardContent>
                                    <div className={classes.controls}>
                                    <IconButton aria-label="Previous">
                                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                    </IconButton>
                                    <IconButton aria-label="Play/pause">
                                        <PlayArrowIcon className={classes.playIcon} />
                                    </IconButton>
                                    <IconButton aria-label="Next">
                                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                    </IconButton>
                                    </div>
                                </div>
                                <CardMedia
                                    component="img"
                                    alt={post.description}
                                    className={classes.media}
                                    // height="140"
                                    image={post.imageLink}
                                    title={post.name}
                                    />
                            </Card>
                          {/*   <h3>{post.name}</h3> 
                            <button type="button" onClick={back}>
                                Close
                            </button> */}
>>>>>>> e93b788283faba97992a1e303afee26c6958798e
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
<<<<<<< HEAD
};

export default withStyles(styles)(Single);
=======
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Single);
>>>>>>> e93b788283faba97992a1e303afee26c6958798e
