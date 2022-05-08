import classes from "./TweetStyle.module.css";

const Tweet = (props) => {
  const userLink = `/${props.username}`

  return (
    <div className={classes.tweet}>
      <div className={classes["tweet-left"]}>
        <img src={props.picture} alt="Profile" />
      </div>
      <div className={classes["tweet-right"]}>
        <div className={classes["tweet-right__top"]}>
          <div className={classes["user-info"]}>
            <a id={classes["user-name"]} href={userLink}>
              {props.fullname}
            </a>
            <a id={classes["username"]} href={userLink}>
              {props.username}
            </a>
            <a id={classes["tweet-dot"]} href="\">
              ·
            </a>{" "}
            {/* this is a link to the post */}
            <a id={classes["tweet__time-created"]} href="\">
              {props.timeCreated}
            </a>{" "}
            {/* this is a link to the post */}
          </div>
          <div className={classes.more}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={classes["tweet-content"]}>
            {props.content}
        </div>
        <div className={classes["tweet-right__bottom"]}>
          <div>
            <i className="fa fa-reply" />
            <p>{props.reply}</p>
          </div>
          <div>
            <i className="fa fa-retweet" />
            <p>{props.retweet}</p>
          </div>
          <div>
            <i className="fa fa-heart-o" />
            <p>{props.like}</p>
          </div>
          <div>
            <i className="fa fa-upload" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
