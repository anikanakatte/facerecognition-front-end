import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

//particles background options
const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  imageUrl: '',
      input: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      //user info state
      user: {
        id: '',
        name: '',
        email: '',        
        entries: 0,
        joined: ''
      }
};


class App extends Component {
  constructor () {
    super();
    this.state = initialState;      
    }
  
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,        
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateBoundingBox = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: faceData.left_col * width,
      rightCol: width - (faceData.right_col * width),
      topRow: faceData.top_row * height,
      bottomRow: height - (faceData.bottom_row * height)
    }        
  }

  displayBoundingBox = (box) => {
    //console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      input: this.state.input           
      }) 
    })
    .then(response => response.json())    
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id            
          }) 
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(console.log);
        }
        this.displayBoundingBox(this.calculateBoundingBox(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (routeValue) => {
    if(routeValue === 'signout') {
      this.setState(initialState);
    } else if(routeValue === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: routeValue});
  }

  render() { 
    const { box, isSignedIn, route, imageUrl } = this.state;   
    return (
      <div className="App">
        <Particles className="particles" 
          params= {particleOptions}             
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />      
        { route === 'home'
          ?             
            <div>              
              <Logo />
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries}  
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition 
                box={box} 
                imageUrl={imageUrl}
              />
            </div>
          :
            (
              route === 'signin'
              ?
                <SignIn 
                  loadUser={this.loadUser} onRouteChange={this.onRouteChange}
                />
              :
                <Register 
                  loadUser={this.loadUser} onRouteChange={this.onRouteChange}
                />
            )
        }
      </div>
    );
  }
}

export default App;