import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Single);