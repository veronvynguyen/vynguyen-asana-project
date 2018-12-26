import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
// import Illustration from '../images/Illustration.png';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Picture } from 'react-responsive-picture';
const uuid = require('uuid');

class AddPhoto extends Component {
  state = {
    name: "",
    age: "",
    weight: "",
    gender: "",
    breed: "",
    description: "",
    shelterAddress: "",
    shelterPhone: "",
    shelterEmail: "",
    imageLink: "",
    isUploading: false,
    progress: 0,
    uid: uuid.v1(),
  };
    
  handlePostChange = event => {
    const name = this.refs.name.value;
    const age= this.refs.age.value;
    const weight = this.refs.weight.value;
    const gender = this.refs.gender.value;
    const breed = this.refs.breed.value;
    const description = this.refs.description.value;
    const shelterAddress = this.refs.shelterAddress.value;
    const shelterPhone = this.refs.shelterPhone.value;
    const shelterEmail = this.refs.shelterEmail.value;
    this.setState({
      name, 
      age,
      weight,
      gender,
      breed,
      description, 
      shelterAddress, 
      shelterPhone,
      shelterEmail
    });
  }

  submitData = event => {
    firebase.database()
      .ref(`posts/${this.state.uid}`).set({
        name: this.state.name,
        age: this.state.age,
        breed: this.state.breed,
        gender: this.state.gender,
        weight: this.state.weight,
        shelterDescription: this.state.description,
        shelterAddress: this.state.shelterAddress,
        shelterPhone: this.state.shelterPhone,
        shelterEmail: this.state.shelterEmail,
        imageLink: this.state.imageLink,
      }).catch(error => console.log(error));
  }

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
          shelterAddress: this.state.shelterAddress,
          shelterPhone: this.state.shelterPhone,
          shelterEmail: this.state.shelterEmail,
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
           {/* <Picture src={Illustration} sizes="(max-width: 90%)"/>   */}
          </Col>
          <Col xs={6} md={8}>
            <div className="form">
              <form onSubmit={this.submitData}>
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

                <input type="text" ref="name" placeholder="Name" onChange={this.handlePostChange}/>
                <input type="text" ref="age" placeholder="Age" onChange={this.handlePostChange}/>
                <input type="text" ref="weight" placeholder="Weight" onChange={this.handlePostChange}/>
                <input type="text" ref="gender" placeholder="Gender" onChange={this.handlePostChange}/>
                <input type="text" ref="breed" placeholder="Breed" onChange={this.handlePostChange}/>
                <input type="text" ref="description" placeholder="Background (ex. dog's gender, weight, breed, age)." onChange={this.handlePostChange}/>
                <input type="text" ref="shelterAddress" placeholder="Shelter Address" onChange={this.handlePostChange}/>
                <input type="text" ref="shelterPhone" placeholder="Shelter's Phone" onChange={this.handlePostChange}/>
                <input type="text" ref="shelterEmail" placeholder="Shelter's Email" onChange={this.handlePostChange}/>
                {this.state.isUploading && <p>Progress: {this.state.progress}%</p>}
                {this.state.imageLink && <Picture src={this.state.imageLink} className="uploadImg"/>}
                <input type="submit" />Submit
              </form>
            </div>
          </Col> 
        </Row>
      </Grid>
    );
  }
}

export default AddPhoto;