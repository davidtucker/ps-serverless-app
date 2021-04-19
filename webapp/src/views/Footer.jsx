import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#333',
    height: 60,
  },
  footerContent: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    color: '#FFF',
    '& a': {
      color: 'white',
      textDecoration: 'underline',
    },
  },
  footerLogo: {
    height: 30,
    cursor: 'pointer',
  },
}));

function Footer() {
  const classes = useStyles();

  const handleLogoClick = () => {
    window.location.href = 'https://tuck.cc/serverlessDev';
  };

  return (
    <Grid container className={classes.root} alignContent="center" alignItems="center" justify="space-between">
      <Grid item className={classes.footerContent}>
        <img src="/images/ps-logo.png" alt="Pluralsight Logo" className={classes.footerLogo} onClick={handleLogoClick} />
      </Grid>
      <Grid item className={classes.footerContent}>
        <Typography variant="body2">
          This application is part of the
          <a href="https://tuck.cc/serverlessDev" target="_blank" rel="noreferrer">Pluralsight path on Serverless development</a>
          .
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
