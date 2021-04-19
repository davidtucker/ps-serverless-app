import React from 'react';
import {
  Grid, Popper, Avatar, Grow, ClickAwayListener, Paper, MenuList, MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useUser } from '../UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    cursor: 'pointer',
  },
}));

function UserBadge() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { user } = useUser();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const onProfileEdit = () => {
    history.push('/profile');
    setOpen(false);
  };

  const onManageUsers = () => {
    history.push('/users');
    setOpen(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const signOut = () => {
    Auth.signOut()
      .finally(window.location.href = '/');
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Grid container wrap="nowrap" spacing={2} className={classes.root}>
        <Grid item>
          <Avatar
            className={classes.small}
            ref={anchorRef}
            src={user.pictureURL}
            onClick={handleToggle}
          />
        </Grid>
      </Grid>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement="bottom-end">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'left-start' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={onProfileEdit}>Edit My Profile</MenuItem>
                  <MenuItem onClick={onManageUsers}>Manage Users</MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default UserBadge;
