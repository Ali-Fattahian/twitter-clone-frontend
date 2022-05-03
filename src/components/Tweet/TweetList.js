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
      {props.tweetList.map((tweet) => (
        <Tweet
          key={tweet.id}
          fullname={`${tweet.firstname} ${tweet.lastname}`}
          username={tweet.user}
          picture={tweet.userPicture}
          timeCreated={dateTimeGenerator(
            tweet.date_created.created_ago,
            tweet.date_created.created
          )}
          content={tweet.content}
          reply={tweet.tweetReply}
          retweet={tweet.tweetRetweets}
          like={tweet.likes.length}
        />
      ))}
    </section>
  );
};

export default TweetList;
