import React from 'react'

function ImageHolder({imgURL}) {
  return (
    <div className="imageHolder">
      <img
        id="inputImageHolder"
        alt="inputimage"
        width="500px"
        heigh="auto"
        src={imgURL}
        />
    </div>
  )
}

export default ImageHolder
