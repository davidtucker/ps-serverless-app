import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

function LoadingView({ size }) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="flex-start"
      className={classes.root}
    >
      <Grid item xs>
        <CircularProgress variant="indeterminate" size={size} />
      </Grid>
    </Grid>
  );
}

LoadingView.propTypes = {
  size: PropTypes.number,
};

LoadingView.defaultProps = {
  size: 40,
};

export default LoadingView;
