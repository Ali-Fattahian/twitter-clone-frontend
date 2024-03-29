import classes from "./TweetStyle.module.css";
import Tweet from "./Tweet";
import dateTimeGenerator from "../../utils";

const TweetList = (props) => {
  if (!props.tweetList)
    return (
      <section className={classes["no-tweet"]}>
        <p>No tweet was found, Please check your internet connection.</p>
      </section>
    );
  return (
    <section id="tweet-list" className={classes["tweet-list"]}>
      {props.tweetList.length!==0 ? props.tweetList.map((tweet) => (
        <Tweet
          tweetId={tweet.id}
          key={tweet.id}
          firstname={tweet.user.firstname}
          lastname={tweet.user.lastname}
          username={tweet.user.username}
          picture={tweet.user.picture}
          timeCreated={dateTimeGenerator(
            tweet.date_created.created_ago,
            tweet.date_created.created
          )}
          content={tweet.content}
          reply={tweet.tweetReply}
          retweet={tweet.tweetRetweets}
          likes={tweet.likes.length}
          isBookmarkPage={props.isBookmarkPage}
          setNeedRefresh={props.setNeedRefresh}
        />
      )) : <p className="p-info--center">No tweets yet!</p>}
    </section>
  );
};

export default TweetList;
