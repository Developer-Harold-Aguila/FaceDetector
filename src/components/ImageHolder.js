import React from 'react'

function ImageHolder({imgURL}) {
  return (
    <div className="bounding-box-set">
      <img
        className="bounding-box"
        id="inputImage"
        alt="inputimage"
        width="auto"
        height="500px"
        src={imgURL}
        />
    </div>
  )
}

export default ImageHolder
