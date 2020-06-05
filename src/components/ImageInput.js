import React from 'react'

function ImageInput({onButtonSubmit}) {
  return (
    <div className="ImageInput">
      <button onClick = { onButtonSubmit } value="try it now!"> button </button>
    </div>
  )
}

export default ImageInput
