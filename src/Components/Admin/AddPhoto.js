import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { Picture } from 'react-responsive-picture';

// This functionality is still in development
class AddPhoto extends Component {
  state = {
    id: Number(new Date()),
    name: "",
    age: "",
    weight: "",
    gender: "",
    breed: "",
    personality: "",
    shelterAddress: "",
    shelterPhone: "",
    shelterEmail: "",
    imageLink: "",
    css: "",
    isUploading: false,
    progress: 0,
  };
    
  handlePostChange = event => {
    this.setState({
      name: this.refs.name.value,
      age:this.refs.age.value,
      weight: this.refs.weight.value,
      gender: this.refs.gender.value,
      breed: this.refs.breed.value,
      personality: this.refs.personality.value,
      shelterAddress: this.refs.shelterAddress.value, 
      shelterPhone: this.refs.shelterPhone.value,
      shelterEmail: this.refs.shelterEmail.value,
    });
  }

  submitData = event => {
    firebase.database()
      .ref(`posts/${this.state.id}`).set({
        id: this.state.id,
        name: this.state.name,
        age: this.state.age,
        breed: this.state.breed,
        gender: this.state.gender,
        weight: this.state.weight,
        personality: this.state.personality,
        shelterAddress: this.state.shelterAddress,
        shelterPhone: this.state.shelterPhone,
        shelterEmail: this.state.shelterEmail,
        imageLink: this.state.imageLink,
        css: this.state.css
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
        this.setState({css: 'url("' + url + "')"});
    })
  }
  
  render() {
    return (<div className="form upload"> 
       <h1 className="text-center">Create a listing</h1>
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

          <label for="personality">Personality/Temperament</label>
          <input type="text" ref="personality" placeholder="Ex. Social butterfly, quick learner" onChange={this.handlePostChange}/>

          <label for="shelterAddress">Shelter's Address</label>
          <input type="text" ref="shelterAddress" placeholder="Ex. 3921 Canine, CA 28129" onChange={this.handlePostChange}/>

          <label for="shelterPhone">Shelter's Phone</label>
          <input type="text" ref="shelterPhone" placeholder="Ex. (714) 492-2912" onChange={this.handlePostChange}/>

          <label for="shelterEmail">Shelter's Email</label>
          <input type="text" ref="shelterEmail" placeholder="Ex. doglovers@example.com" onChange={this.handlePostChange}/>

          {this.state.isUploading && <p>Progress: {this.state.progress}%</p>}
          {this.state.imageLink && <Picture src={this.state.imageLink} className="uploadImg"/>}

          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddPhoto;