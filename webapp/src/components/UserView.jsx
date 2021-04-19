import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function UserView({ userId }) {
  const classes = useStyles();
  const { getUserProfile } = useUser();
  const [userData, setUserData] = useState(null);

  React.useEffect(() => {
    (async () => {
      setUserData(await getUserProfile(userId));
    })();
  }, [userId, getUserProfile]);

  const getPictureURL = () => {
    if (userData && userData.pictureURL) {
      return userData.pictureURL;
    }
    return '';
  };

  const getName = () => {
    if (userData && userData.name) {
      return userData.name;
    }
    return '';
  };

  return (
    <div>
      <Grid container spacing={2} className={classes.root} direction="row" justify="flex-start" alignItems="center">
        <Grid item>
          <Avatar className={classes.small} src={getPictureURL()} />
        </Grid>
        <Grid item xs>
          <Typography component="p">
            {getName()}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

UserView.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserView;
