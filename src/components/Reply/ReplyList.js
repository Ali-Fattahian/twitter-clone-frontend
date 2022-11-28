import axios from "axios";
import React, { useCallback, useEffect, useState, useContext } from "react";
import Reply from "./Reply";
import classes from "./Reply.module.css";
import dateTimeGenerator from '../../utils'
import { ServerContext } from "../../store/server-context";

const ReplyList = (props) => {
  const [replyList, setReplyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { serverURL } = useContext(ServerContext)

  const getReplies = useCallback(async () => {
    setIsLoading(true);
    setHasStarted(true);
    await axios
      .get(`${serverURL}tweets/${props.tweetId}/reply`)
      .then((res) => {
        if (res.status === 200) {
          setReplyList(res.data);
        } else {
          setHasError(true);
        }
      });
    setIsLoading(false);
  }, [props.tweetId]);

  useEffect(() => {
    getReplies();
  }, [getReplies, props.newReply]);

  return (
    <section className={classes["reply-list"]}>
      {hasError && (
        <p
          style={{
            textAlign: "center",
            color: "#71767b",
            marginTop: "1.5rem",
          }}
        >
          Sorry there was an error fetching the replies, Please check your
          internet connection.
        </p>
      )}
      {!isLoading &&
        hasStarted &&
        !hasError &&
        replyList.map((reply) => (
          <Reply
            key={reply.id}
            text={reply.text}
            fullname={`${reply.user.firstname} ${reply.user.lastname}`}
            username={reply.user.username}
            profilePicture={reply.user.picture}
            timeCreated={dateTimeGenerator(
              reply.date_created.created_ago,
              reply.date_created.created
            )}
          />
        ))}
      {!hasError && !isLoading && hasStarted && replyList.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "#71767b",
            marginTop: "1.5rem",
          }}
        >
          No replies yet!
        </p>
      )}
    </section>
  );
};

export default ReplyList;
