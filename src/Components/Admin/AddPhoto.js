import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Picture } from 'react-responsive-picture';
import Dog from '../../images/Dog.png';

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
    // const description = this.refs.description.value;
    const shelterAddress = this.refs.shelterAddress.value;
    const shelterPhone = this.refs.shelterPhone.value;
    const shelterEmail = this.refs.shelterEmail.value;
    this.setState({
      name, 
      age,
      weight,
      gender,
      breed,
      // description, 
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
        // description: this.state.description,
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
          age: this.state.age,
          weight: this.state.weight,
          gender: this.state.gender,
          breed: this.state.breed,
          // description: this.state.description,
          name: this.state.name,
          shelterAddress: this.state.shelterAddress,
          shelterPhone: this.state.shelterPhone,
          shelterEmail: this.state.shelterEmail,
          imageLink: url
        }
        this.props.startAddingPost(post);
    })

    
  };

  render() {
    return (
      <Grid fluid>
        <Row between="xs">
          <Col xs={3}>
          <Picture src={Dog} className="form-graphic"/>
          </Col>
          <Col xs={9}>
            <div className="form"> 
            <h1>Create a listing</h1>
              <form onSubmit={this.submitData}>
                <label>Upload photo:</label>
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
                <label for="name">Name</label>
                <input type="text" ref="name" placeholder="Enter dog's name" onChange={this.handlePostChange}/>
                <label for="age">Age</label>
                <input type="text" ref="age" placeholder="Enter dog's age" onChange={this.handlePostChange}/>
                <label for="weight">Weight</label>
                <input type="text" ref="weight" placeholder="Enter dog's weight in lbs" onChange={this.handlePostChange}/>
                <label for="gender">Gender</label>
                <input type="text" ref="gender" placeholder="M/F" onChange={this.handlePostChange}/>
                <label for="breed">Breed</label>
                <input type="text" ref="breed" placeholder="Enter dod's breed" onChange={this.handlePostChange}/>
                {/* <label for="description">Description</label>
                <input type="text" ref="description" placeholder="Background (ex. dog's gender, weight, breed, age)." onChange={this.handlePostChange}/> */}
                <label for="shelterAddress">Shelter's Address</label>
                <input type="text" ref="shelterAddress" placeholder="Ex. 1211 Dogville, CA 29181" onChange={this.handlePostChange}/>
                <label for="shelterPhone">Shelter's Phone</label>
                <input type="text" ref="shelterPhone" placeholder="Ex. (714) 492-2912" onChange={this.handlePostChange}/>
                <label for="shelterEmail">Shelter's Email</label>
                <input type="text" ref="shelterEmail" placeholder="Ex. doglovers@example.com" onChange={this.handlePostChange}/>

                {this.state.isUploading && <p>Progress: {this.state.progress}%</p>}
                {this.state.imageLink && <Picture src={this.state.imageLink} className="uploadImg"/>}
                <input type="submit" />
              </form>
            </div>
          </Col> 
        </Row>
      </Grid>
    );
  }
}

export default AddPhoto;