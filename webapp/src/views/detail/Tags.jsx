import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import MetadataSection from '../../components/MetadataSection';

const useStyles = makeStyles((theme) => ({
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function Tags({ tags }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <MetadataSection title="Tags">
      <div className={classes.tagContainer}>
        {tags && tags.map((tag) => (
          <Chip label={tag} key={tag} color="primary" />
        ))}
      </div>
    </MetadataSection>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

Tags.defaultProps = {
  tags: [],
};

export default Tags;
