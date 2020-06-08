import React from 'react'

function FaceBounding(props) {
  return <div className="boundingBox" key={props.item}
                  style={{top: props.top,
                            right: props.right,
                            bottom: props.bottom,
                            left: props.left}}>
          </div>
}

export default FaceBounding
