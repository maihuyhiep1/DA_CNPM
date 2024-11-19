import React from 'react'
import "./Feed.scss"
import Stories from '../stories/Stories'

const Feed = () => {
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Stories />
      </div>
    </div>
  )
}

export default Feed