import classes from "./TweetStyle.module.css";
import Profile from './default_profile.png';

const AddTweet = () => {
  return (
    <form id='add-tweet' className={classes["add-tweet__form"]}>
      <div className={classes["add-tweet__upper"]}>
        <img className={classes["add-tweet__image"]} src={Profile} alt='Default profile' />
        <textarea
          className={classes["add-tweet__input"]}
          placeholder="What's happening?"
        />
      </div>
      <div className={classes["add-tweet__lower"]}>
          <div className={classes['btn-container']}>
              <button className='btn'>Tweet</button>
          </div>
      </div>
    </form>
  );
};

export default AddTweet;
