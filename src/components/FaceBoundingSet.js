import React from 'react'
import FaceBounding from './FaceBounding'

function FaceBoundingSet(props) {
  console.log("faceBoundingSet", props)

  return (
    <div className="faceBoundingSet">
      {
        !props ? <h1>hello</h1> :
        Object.entries(props.boundingBox).map(([key, value]) => {

            return <FaceBounding
                      key={key}
                      top={value.top}
                      right={value.right}
                      bottom={value.bottom}
                      left={value.left}/>
                               })
      }

    </div>

  )
}

export default FaceBoundingSet
