import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import doggie from '../images/doggie.jpg';
 
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
     { switch(field) {
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
      <div className="form">
        <img src={doggie} alt="Happy dog" width="50%"/>
        <form>   
          <input type="text" name="name" placeholder="name" onChange={this.handlePostChange("name")}/>
          <input type="text" name="age" placeholder="age"/>
          <input type="text" name="weight" placeholder="weight"/>
          <input type="text" name="gender" placeholder="gender"/>
          <input type="text" name="breed" placeholder="breed"/>
          <label>Image:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.imageLink && <img src={this.state.imageLink} />}
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
          <button> Post </button>
        </form>
      </div>
    );
  }
}

// class AddPhoto extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//       url: '',
//       progress: 0
//     }
//     this.handleChange = this
//       .handleChange
//       .bind(this);
//     this.handleUpload = this.handleUpload.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange = e => {
//     if (e.target.files[0]) {
//       const image = e.target.files[0];
//       this.setState(() => ({image}));
//     }
//   }
//   handleUpload = () => {
//       const {image} = this.state;
//       const uploadTask = storage.ref(`images/${image.name}`).put(image);
//       uploadTask.on('state_changed', 
//       (snapshot) => {
//         // progrss function ....
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         this.setState({progress});
//       }, 
//       (error) => {
//            // error function ....
//         console.log(error);
//       }, 
//     () => {
//         // complete function ....
//         storage.ref('images').child(image.name).getDownloadURL().then(url => {
//             this.setState({url});
//             const post = {
//               id: Math.random(),
//               description: description,
//               imageLink: imageLink
//             }
//             this.props.startAddingPost(post);
//         })
//     });
//   }
//   render() {
//     const style = {
//       height: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center'
//     };
//     return (
//       <div style={style}>
//         <form onSubmit={this.handleUpload}>
//           <progress value={this.state.progress} max="100"/>
//           <input type="file" onChange={this.handleChange}/>

//           <input type ="text" placeholder="Link" name="link" value={this.state.url}/>
//           <input type ="text" placeholder="Description" name="description"/>
//         </form>
//         <br/>
//       </div>
//     )
//   }
// }

export default AddPhoto;