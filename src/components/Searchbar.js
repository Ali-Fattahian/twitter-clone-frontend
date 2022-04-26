import classes from "./Searchbar.module.css";

const Searchbar = () => {
  const searchFormFocusHandler = () =>
    (document.querySelector(".fa-search").style.color = "#1D9bf0");

  const searchFormBlurHandler = () =>
    (document.querySelector(".fa-search").style.color = "#71767b");

  return (
    <form
      className={classes["search-bar"]}
      onFocus={searchFormFocusHandler}
      onBlur={searchFormBlurHandler}
    >
      <i className="fa fa-search"></i>
      <input type="search" placeholder="Search..." />
    </form>
  );
};

export default Searchbar;
