import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackupIcon from '@material-ui/icons/Backup';
import { useHistory } from 'react-router-dom';
import UserBadge from '../components/UserBadge';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    borderBottom: '1px solid #EEE',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flexGrow: 1,
  },
  logo: {
    width: 220,
    cursor: 'pointer',
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar className={classes.root} position="relative">
      <Toolbar>
        <div className={classes.logoContainer}>
          <img src="/images/globomantics-logo-grey.png" alt="Globomantics Logo" className={classes.logo} onClick={() => history.push('/')} />
        </div>
        <Button variant="outlined" color="primary" onClick={() => history.push('/upload')} className={classes.uploadButton} startIcon={<BackupIcon />}>Upload</Button>
        <UserBadge />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
