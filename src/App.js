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
    const image = document.getElementById("inputImage")
    const width  = Number(image.width)
    const height = Number(image.height)

    let bouncingBoxList = []
    let bouncingBox = []

    data.outputs[0].data.regions.map(regions => {
          const bottomRow = regions.region_info.bounding_box.bottom_row
          const rightCol = regions.region_info.bounding_box.right_col
          const left_colCol = regions.region_info.bounding_box.left_col

          bouncingBox = {
              bottom_row: height - bottomRow,
              left_col: bottomRow * width,
              right_col: width - rightCol * width,
              top_row: left_colCol * height
          }

          bouncingBoxList.push(bouncingBox)
        }
    )
    return bouncingBoxList
  }

  setBouncingBox = (bouncingBoxList) => {
    this.setState({
      bouncingBox: bouncingBoxList
    })

    console.log("State BouncingBox Values",this.state.bouncingBox)
  }

  onButtonSubmit = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
          "https://i.insider.com/57f67e9157540ccb028b537e?width=600&format=jpeg&auto=webp")
          .then( response => this.setBouncingBox(this.calculateBouncingBox(response)))
          .catch(error=> console.log(error))
  }


  render(){
    return (
      <div className="App">
        <h1>Hello! I'm a face detector! </h1>
        <ImageInput onButtonSubmit={this.onButtonSubmit}/>
        <ImageHolder
          imgURL="https://i.insider.com/57f67e9157540ccb028b537e?width=600&format=jpeg&auto=webp"
          bouncingBox = {this.state.bouncingBox}/>
      </div>
    )
  }
}



export default App
