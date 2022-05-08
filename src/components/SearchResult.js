import classes from "./Searchbar.module.css";

const SearchResult = (props) => {
  return (
    <a className={classes["profile"]} href={`/${props.username}`}>
      <img
        className={classes["profile__img"]}
        src={props.picture}
        alt="Profile"
      />
      <div className={classes["profile__info"]}>
        <p
          id={classes["full-name"]}
        >{`${props.firstname} ${props.lastname}`}</p>
        <p>@{props.username}</p>
        <p>{props.bio.slice(0, 40)}...</p>
      </div>
    </a>
  );
};

export default SearchResult;
