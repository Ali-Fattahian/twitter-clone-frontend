import React from 'react'
import classes from './Reply.module.css'

const Reply = props => {
  return (
    <div className={classes['reply']}>
        <p>{props.text}</p>
    </div>
  )
}

export default Reply