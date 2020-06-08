import React from 'react'

function InputHolder({onButtonSubmit, onChange}) {
  return (
    <div className="InputHolder">
      <input type="text" id="inputImage" name="inputImage" onChange={onChange} />
      <button onClick = { onButtonSubmit } value="try it now!"> Submit </button>
    </div>
  )
}

export default InputHolder
