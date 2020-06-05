import React, { Component } from 'react'
import './App.css'
import ImageHolder from './components/ImageHolder'
import ImageInput from './components/ImageInput'
import FaceDetectorHolder from './components/FaceDetectorHolder'
import  Clarifai from 'clarifai'
import api_key from './api'

const app = new Clarifai.App({
 apiKey: api_key
});

class App extends Component {
  constructor(){
    super()
    this.state = {
      inputImage: "",
      bouncingBox: {}
    }
  }

  calculateBouncingBox = (data) => {
    console.log(data)
    const { bottom_row, left_col, right_col, top_row } = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById("inputImage")
    const width  = Number(image.width)
    const height = Number(image.height)

    const bouncingBoxData = {
      bottom_row: height - bottom_row ,
      left_col: bottom_row * width,
      right_col: width - right_col * width,
      top_row: left_col * height
    }

    return bouncingBoxData
  }

  setBouncingBox = (bouncingBoxData) => {
    this.setState({
      bouncingBox: bouncingBoxData
    })

    console.log(this.state.bouncingBox)
  }

  onButtonSubmit = () => {
    console.log("helolll")
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
          "https://image.shutterstock.com/image-photo/close-photo-cheerful-excited-glad-260nw-789414166.jpg")
          .then( response => this.setBouncingBox(this.calculateBouncingBox(response)))
          .catch(error=> console.log(error))
  }


  render(){
    return (
      <div className="App">
        <h1>Hello! I'm a face detector! </h1>
        <ImageInput onButtonSubmit={this.onButtonSubmit}/>
        <ImageHolder
          imgURL="https://image.shutterstock.com/image-photo/close-photo-cheerful-excited-glad-260nw-789414166.jpg"
          bouncingBox = {this.state.bouncingBox}/>
      </div>
    )
  }
}



export default App
