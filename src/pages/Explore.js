import YouMightLike from "../components/YouMightLike";
import classes from "./HomePage.module.css";
import Navigation from "../components/Navigation";
import Searchbar from "../components/Searchbar";
import TweetList from "../components/Tweet/TweetList";

const Explore = () => {
  return (
    <section className={classes.main}>
      <div className={classes["main__left-side"]}>
        <Navigation />
      </div>
      <div className={classes["main__middle-side"]}>
        <div className={classes["search-bar__container"]}>
          <Searchbar />
        </div>
        <TweetList />
      </div>
      <div className={classes["main__right-side"]}>
        <YouMightLike />
        <div className={classes['extra-links']}>
          <a href='\'>Terms of Service</a>
          <a href='\'>Privacy Policy</a>
          <a href='\'>Cookie Policy</a>
          <a href='\'>Imprint</a>
          <a href='\'>Accessibility</a>
          <a href='\'>Ads info</a>
          <a href='\'>More</a>
          <p>© 2022 Twitter, Inc.</p>
        </div>
      </div>
    </section>
  );
};

export default Explore;







