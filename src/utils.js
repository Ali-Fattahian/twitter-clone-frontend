function dateTimeGenerator(createdAgo, date_created) {
  const { days } = createdAgo
  const { hours } = createdAgo
  const { minutes } = createdAgo
  const { seconds } = createdAgo

  if (days > 0) {
    if (days === 7) return "a week ago";
    else if (days === 1) return "yesterday";
    else if (1 < days < 7) return `${days} days ago`;
    else if (days > 7) return date_created;
  } else if (days === 0) { // 23 hours and less
    if (hours > 0) {
      if (hours === 1) return "an hour ago";
      else if (1 < hours < 24) return `${hours} hours ago`;
    } else if (hours === 0) {  // 59 minutes and less
      if (minutes > 0) {
        if (minutes === 1) return "a minute ago";
        else if (1 < minutes < 60) return `${minutes} minutes ago`;
      } else if (minutes === 0) { // 59 seconds and less
        if (seconds > 0) {
          if (seconds === 1) return "a seconds ago";
        } else if (1 < seconds < 60) {
          return `${seconds} seconds ago`;
        }
      }
    }
  }
}

export default dateTimeGenerator;
