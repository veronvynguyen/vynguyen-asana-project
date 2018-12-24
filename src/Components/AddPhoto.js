import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import AdoptMe from '../images/AdoptMe.png';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Picture } from 'react-responsive-picture';

class AddPhoto extends Component {
  state = {
    description: "",
    name: "",
    age: "",
    weight: "",
    gender: "",
    breed: "",
    isUploading: false,
    progress: 0,
    imageLink: ""
  };
    
  handlePostChange = event => 
    this.setState({
        [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value,
    });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
        this.setState({imageLink: url});
        const post = {
          id: Number(new Date()),
          description: this.state.description,
          name: this.state.name,
          age: this.state.age,
          weight: this.state.weight,
          gender: this.state.gender,
          breed: this.state.breed,
          imageLink: url
        }
        this.props.startAddingPost(post);
    })
  };

  render() {
    return (
      <Grid fluid>
        <Row between="xs">
          <Col xs={6} md={4}>
           <Picture src={AdoptMe} sizes="(max-width: 90%)" className="dogImage"/>  
          </Col>
          <Col xs={6} md={8}>
            <div className="form">
              <form>
                <label>Upload an image</label> 
                <FileUploader
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />

                <input type="text" name="name" placeholder="name" onChange={this.handlePostChange}/>
                <input type="text" name="age" placeholder="age" onChange={this.handlePostChange}/>
                <input type="text" name="weight" placeholder="weight" onChange={this.handlePostChange}/>
                <input type="text" name="gender" placeholder="gender" onChange={this.handlePostChange}/>
                <input type="text" name="breed" placeholder="breed" onChange={this.handlePostChange}/>
                <input type="text" name="description" placeholder="description" onChange={this.handlePostChange}/>
                
                {this.state.isUploading && <p>Progress: {this.state.progress}%</p>}
                {this.state.imageLink && <Picture src={this.state.imageLink} className="uploadImg"/>}
                <button>Add Dog</button>
              </form>
            </div>
          </Col> 
        </Row>
      </Grid>
    );
  }
}

export default AddPhoto;