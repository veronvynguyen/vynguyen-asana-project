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
 
  handlePostChange = (event, field) =>
     { 
       console.log(field)
      switch(field) {
        case 'name':
          this.setState({name: event.target.elements.name.value})
          console.log("Name: " + this.state.name)
        case 'age':
          this.setState({name: event.target.elements.age.value})
        default:
          return null;
    }
  }
    // this.setState({ 
    //   {field}:
    //   // description: event.target.elements.description.value,
    //   name: event.target.elements.name.value,
    //   age: event.target.elements.age.value,
    //   weight: event.target.elements.weight.value,
    //   gender: event.target.elements.gender.value,
    //   breed: event.target.elements.breed.value,
    //   personality: event.target.elements.personality.value 
    // });

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

                <input type="text" name="name" placeholder="name" onChange={this.handlePostChange("name")}/>
                <input type="text" name="age" placeholder="age"/>
                <input type="text" name="weight" placeholder="weight"/>
                <input type="text" name="gender" placeholder="gender"/>
                <input type="text" name="breed" placeholder="breed"/>
                
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