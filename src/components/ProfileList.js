import classes from "./Profile.module.css";
import SmallProfile from "./SmallProfile";

const ProfileList = (props) => {
  return (
    <div className={classes["profile-list"]}>
      {props.profiles.map((profile) => (
        <SmallProfile
          key={profile.id}
          profile={profile}
          username={profile.username}
          firstname={profile.firstname}
          lastname={profile.lastname}
          bio={profile.bio}
          picture={profile.picture}
          pageName={props.pageName}
          setRefreshFollow={props.setRefreshFollow}
        />
      ))}
    </div>
  );
};

export default ProfileList;
