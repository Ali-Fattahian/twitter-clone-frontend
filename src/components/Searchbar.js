import classes from "./Searchbar.module.css";

const Searchbar = (props) => {
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
      <input type="search" placeholder="Search..." name="search" />

      <div className={classes["search-results"]}>
        {props.searchResults ? (
          <div className={classes["profiles"]}>
            {props.searchResults.map((searchResult) => (
              <a className={classes["profile"]} href={props.profileLink}>
                <img
                  className={classes["profile__img"]}
                  src={searchResult.profileImage}
                  alt="Profile"
                />
                <div className={classes["profile__info"]}>
                  <p id={classes['full-name']}>{searchResult.fullName}</p>
                  <p>@{searchResult.username}</p>
                  <p>{searchResult.bio.slice(0, 40)}...</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p style={{textAlign: 'center'}}>Try searching for people, topics, or keywords</p>
        )}
      </div>
    </form>
  );
};

export default Searchbar;
