import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <div className={`${classes.root} view`}>
      Not Found
    </div>
  );
}

export default NotFound;
