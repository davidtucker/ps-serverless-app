import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  typeIcon: {
    maxWidth: 20,
    marginRight: 20,
  },
  nameLabel: {
    marginTop: 3,
    fontWeight: 500,
  },
}));

function FileName({ file }) {
  const classes = useStyles();

  return (
    <Link className={classes.root} to={file.FileSize ? `/document/${file.PK}` : ''}>
      <div className={classes.typeIcon}>
        <FileIcon
          className={classes.typeIcon}
          extension="pdf"
          {...defaultStyles.pdf} // eslint-disable-line react/jsx-props-no-spreading
        />
      </div>
      <div className={classes.nameLabel}>
        {file.Name}
      </div>
    </Link>
  );
}

FileName.propTypes = {
  file: PropTypes.shape({
    FileSize: PropTypes.number,
    PK: PropTypes.string,
    Name: PropTypes.string,
  }).isRequired,
};

export default FileName;
