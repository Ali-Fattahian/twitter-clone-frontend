import classes from "./TweetStyle.module.css";
import Profile from "./default_profile.png";
import Tweet from "./Tweet";

const DUMMY_TWEETS = [
  {
    userFullname: "John Doe",
    userUsername: "@john_doe",
    userPicture: Profile,
    tweetTimeCreated: "2h",
    tweetContent:
      "FastAPI is an open source Python web dev framework that makes building APIs quick and easy. It's still fairly new, but companies like Netflix have already started using it. This crash course will teach you the basics so you can code APIs quickly.",
    tweetReply: 5,
    tweetRetweets: 2,
    tweetLikes: 20,
  },
  {
    userFullname: "Maximillian",
    userUsername: "@maxedapps",
    userPicture: Profile,
    tweetTimeCreated: "1h",
    tweetContent:
      "Really awesome! Congrats on pushing through this huge course! 🎉",
    tweetReply: null,
    tweetRetweets: null,
    tweetLikes: 18,
  },
  {
    userFullname: "Shawn Mendes",
    userUsername: "@ShawnMendes",
    userPicture: Profile,
    tweetTimeCreated: "40m",
    tweetContent: "love u guys",
    tweetReply: 5833,
    tweetRetweets: 5131,
    tweetLikes: "24.6k",
  },
  {
    userFullname: "Adam Rackis",
    userUsername: "@AdamRackis",
    userPicture: Profile,
    tweetTimeCreated: "3h",
    tweetContent:
      "Is it me or did React 18 release to relatively little fanfare? I’m not seeing many blog posts, tweets, etc. Did dropping suspense for data fetching limit 18’s importance? Are people just burned out on React at this point?",
    tweetReply: 25,
    tweetRetweets: 2,
    tweetLikes: 64,
  },
];

const TweetList = (props) => {
  return <section className={classes["tweet-list"]}>
    {DUMMY_TWEETS.map(tweet => <Tweet fullname={tweet.userFullname} username={tweet.userUsername} picture={tweet.userPicture} timeCreated={tweet.tweetTimeCreated} content={tweet.tweetContent} reply={tweet.tweetReply} retweet={tweet.tweetRetweets} like={tweet.tweetLikes}  />)}
  </section>;
};

export default TweetList;
