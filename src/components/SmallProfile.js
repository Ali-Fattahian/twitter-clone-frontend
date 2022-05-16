import classes from './Profile.module.css';
import FollowButton from './FollowButton';
import ProfilePicture from './Tweet/default_profile.png'
import { useNavigate } from 'react-router-dom';

const SmallProfile = props => {
  const navigate = useNavigate()

  return (
    <div className={classes['small-profile__section']} onClick={() => {navigate(`/${props.username}`)}}>
        <div className={classes['small-profile__left-part']}>
            <img src={ProfilePicture} alt='Profile' />
        </div>
        <div className={classes['small-profile__right-part']}>
            <div className={classes['small-profile__right-top']}>
                <div className={classes['small-profile__user-name']}>
                    <p id={classes['small-profile__fullname']}>{`${props.firstname} ${props.lastname}`}</p>
                    <p id={classes['small-profile__username']}>@{props.username}</p>
                </div>
                <FollowButton user={props.profile} backgroundColor='#000' color='#fff' />
            </div>
            <div className={classes['small-profile__right-bottom']}>
                <p>{props.bio}</p>
            </div>
        </div>
    </div>
  )
}

export default SmallProfile