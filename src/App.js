import React, { Component } from 'react'
import './App.css'
import InputHolder from './components/InputHolder'
import ImageHolder from './components/ImageHolder'
import FaceBoundingSet from './components/FaceBoundingSet'
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
      boundingBox: {}
    }
  }

  calculateBoundingBox = (data) => {
    const image = document.getElementById("inputImageHolder")
    const width  = Number(image.width)
    const height = Number(image.height)
    let boundingBoxList = []
    let boundingBox = []

    data.outputs[0].data.regions.map(regions => {
          const leftCol = regions.region_info.bounding_box.left_col
          const bottomRow = regions.region_info.bounding_box.bottom_row
          const rightCol = regions.region_info.bounding_box.right_col
          const topRow = regions.region_info.bounding_box.top_row

          boundingBox = {
              left: leftCol * width,
              bottom: height - bottomRow * height,
              right: width - rightCol * width,
              top: topRow * height
          }

          boundingBoxList.push(boundingBox)
        }
    )
    return boundingBoxList
  }

  setBoundingBox (boundingBoxList) {
      this.setState({
        boundingBox: boundingBoxList
      })
  }


  onChange = (event) => {
    this.setState(
      { inputImage: event.target.value,
        boundingBox: {}
      })
  }

  onButtonSubmit = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
          this.state.inputImage)
          .then( response => this.setBoundingBox(this.calculateBoundingBox(response)))
          .catch(error=> console.log(error))
  }

  render(){
    return (
      <div className="App">
        <h1>Hello! I'm a face detector! </h1>
        <InputHolder onButtonSubmit={this.onButtonSubmit} onChange={this.onChange}/>
        <div className="container">
          <ImageHolder imgURL={this.state.inputImage}/>
          <FaceBoundingSet boundingBox = {this.state.boundingBox} />
        </div>
      </div>
    )
  }
}



export default App
