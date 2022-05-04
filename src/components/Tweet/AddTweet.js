import { useRef } from "react";
import classes from "./TweetStyle.module.css";
import Profile from './default_profile.png';
import axiosInstance from "../../axios";

const AddTweet = props => {
  const tweetContent = useRef('')

  const formSubmitHandler = e => {
    e.preventDefault()

    if (props.isAuth) {
      if (tweetContent.current.value.trim().length > 0) {
        sendData()
      }
    }
  }

  async function sendData() {
    const response = await axiosInstance.post('http://127.0.0.1:8000/api/compose/tweet', {
      content: tweetContent.current.value 
    });

    if (response.status === 201) {
      console.log('success')
      tweetContent.current.value='';
      return;
    }
    console.log(response)
  } 

  return (
    <form id='add-tweet' className={classes["add-tweet__form"]} onSubmit={formSubmitHandler}>
      <div className={classes["add-tweet__upper"]}>
        <img className={classes["add-tweet__image"]} src={Profile} alt='Default profile' />
        <textarea
          className={classes["add-tweet__input"]}
          placeholder="What's happening?"
          ref={tweetContent}
        />
      </div>
      <div className={classes["add-tweet__lower"]}>
          <div className={classes['btn-container']}>
              <button className='btn' type="submit">Tweet</button>
          </div>
      </div>
    </form>
  );
};

export default AddTweet;
