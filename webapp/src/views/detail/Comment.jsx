import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Avatar, Typography, Button,
} from '@material-ui/core';
import { useUser } from '../../UserContext';
import { reportCommentForModeration } from '../../services';
import { getFormattedDate } from '../../util';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  username: {
    fontWeight: 500,
  },
  comment: {
    width: '100%',
  },
  commentContainer: {
    padding: theme.spacing(3),
    border: '1px solid #CCC',
    backgroundColor: '#FFF',
    marginTop: theme.spacing(1),
  },
  moderatedCommentContainer: {
    padding: theme.spacing(3),
    border: '1px solid #FF0000',
    backgroundColor: '#EEE',
    marginTop: theme.spacing(1),
  },
}));

function Comment({ comment }) {
  const classes = useStyles();
  const { getUserProfile } = useUser();
  const [userProfile, setUserProfile] = useState(null);
  const [isModerated, setIsModerated] = useState(false);

  useEffect(() => {
    (async () => {
      const profile = await getUserProfile(comment.Owner);
      setUserProfile(profile);
    })();
  }, [comment, getUserProfile]);

  const moderateComment = async () => {
    setIsModerated(true);
    await reportCommentForModeration(comment.SK);
  };

  const getPictureURL = () => {
    if (userProfile && userProfile.pictureURL) {
      return userProfile.pictureURL;
    }
    return '';
  };

  const getUsername = () => {
    if (userProfile && userProfile.name) {
      return userProfile.name;
    }
    return '';
  };

  const getCommentDate = () => {
    if (comment && comment.DateAdded) {
      return getFormattedDate(new Date(comment.DateAdded));
    }
    return '';
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.commentInputContainer}>
        <Grid item xs={1}>
          <Avatar className={classes.small} src={getPictureURL()} />
        </Grid>
        <Grid item xs={11}>
          <Grid container justify="space-between">
            <Typography variant="body1" gutterBottom>
              <span className={classes.username}>{getUsername()}</span>
              {' '}
              -
              {getCommentDate()}
            </Typography>
            <Button size="small" color="secondary" onClick={moderateComment}>Report Comment</Button>
          </Grid>
          { !isModerated
          && (
          <div className={classes.commentContainer}>
            <Typography variant="body1" gutterBottom>
              {comment.Comment}
            </Typography>
          </div>
          ) }
          { isModerated
          && (
          <div className={classes.moderatedCommentContainer}>
            <Typography variant="body1" gutterBottom>
              Comment reported for moderation.
            </Typography>
          </div>
          ) }
        </Grid>
      </Grid>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    Comment: PropTypes.string,
    DateAdded: PropTypes.string,
    Owner: PropTypes.string,
    SK: PropTypes.string,
  }).isRequired,
};

export default Comment;
