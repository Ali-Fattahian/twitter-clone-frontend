import React from 'react'
import axiosInstance from '../axios'

const DeleteSaveTweet = props => {
  const removeTweetHandler = async (e) => {
      e.stopPropagation()
      const response = await axiosInstance.delete(`bookmarks/${props.tweetId}/delete`)
      if (!response) {
        props.setHasError(true)
        props.setErrorMessage("You don't have the permission to remove this item!")
    } else {
        props.setNeedRefresh(new Date()) // Just need something new to refresh the tweet list
    }
  }

  return (
    <i className='fa fa-trash-o' onClick={removeTweetHandler}></i>
  )
}

export default DeleteSaveTweet