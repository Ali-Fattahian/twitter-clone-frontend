import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Searchbar.module.css";
import SearchResult from "./SearchResult";

const Searchbar = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  const searchFormFocusHandler = () => {
    document.querySelector(".fa-search").style.color = "#1D9bf0";
    document
      .querySelector(`.${classes["search-results"]}`)
      .classList.remove(classes["hidden"]);
  };

  const searchFormBlurHandler = () => {
    document.querySelector(".fa-search").style.color = "#71767b";
    document
      .querySelector(`.${classes["search-results"]}`)
      .classList.add(classes["hidden"]);
  };

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const getUsers = useCallback(async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/search-users/",
      {
        params: { search: input },
      }
    );
    if (response.status === 200) setUsers(response.data);
  }, [input]);

  useEffect(() => {
    getUsers();
  }, [input, getUsers]);

  return (
    <form
      className={classes["search-bar"]}
      onFocus={searchFormFocusHandler}
      onBlur={searchFormBlurHandler}
    >
      <i className="fa fa-search"></i>
      <input
        type="search"
        placeholder="Search..."
        name="search"
        onChange={inputChangeHandler}
        value={input}
      />

      <div
        id="search-bar__search-results"
        className={`${classes["search-results"]} ${classes["hidden"]}`}
      >
        <div className={classes["profiles"]}>
          {input.length > 0 && users.length > 0 ? (
            users.map((user) => (
              <SearchResult
                key={user.id}
                firstname={user.firstname}
                lastname={user.lastname}
                picture={user.picture}
                bio={user.picture}
                username={user.username}
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              {input.length > 0 && users.length === 0 ? `No results for '${input}'` : 'Try searching for people, topics, or keywords'}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
