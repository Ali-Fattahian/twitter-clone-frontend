import Navigation from "../components/Navigation";
import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";
import classes from './Pages.module.css';

const Bookmarks = () => {
    return (
        <section className={classes.main}>
        <div className={classes["main__left-side"]}>
          <Navigation />
        </div>
        <div className={classes["main__middle-side"]}>
          <TweetList />
        </div>
        <div className={classes['main__right-side']}>
          <Searchbar />
        </div>
      </section>
    )
};

export default Bookmarks;