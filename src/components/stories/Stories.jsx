import React from 'react'
import "./stories.scss"
import QnA from '../QnA'

const Stories = () => {
  return (
    <div className='container-stories'>
        <h1>Quiz and Answer</h1>
        <div className='stories'>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        <QnA/>
        </div>
    </div>
  )
}

export default Stories