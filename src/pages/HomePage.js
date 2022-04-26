import Navigation from "../components/Navigation";
import Searchbar from "../components/Searchbar";
import AddTweet from "../components/Tweet/AddTweet";
import TweetList from "../components/Tweet/TweetList";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={classes.home}>
      <div className={classes["home__left-side"]}>
        <Navigation />
      </div>
      <div className={classes["home__right-side"]}>
        <AddTweet />
        <TweetList />
      </div>
      <div>
        <Searchbar />
      </div>
    </section>
  );
};

export default HomePage;
