import React from 'react'
import classes from './Reply.module.css'

const Reply = props => {
  return (
    <div className={classes['reply']}>
        <div className={classes['reply-left']}>
          <img src={props.profilePicture} alt={props.fullname} />
        </div>
        <div className={classes['reply-right']}>
          <div className={classes['reply__user']}>
            <div className={classes['user__names']}>
              <p id={classes.fullname}>{props.fullname}</p>
              <p>{props.username}</p>
              <p>· {props.timeCreated}</p>
            </div>
          </div>
          <div className={classes['reply-content']}>
            <p>{props.text}</p>
          </div>
        </div>
    </div>
  )
}

export default Reply