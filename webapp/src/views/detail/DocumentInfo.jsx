import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import MetadataItem from '../../components/MetadataItem';
import MetadataSection from '../../components/MetadataSection';
import { getReadableFileSize, getFormattedDate } from '../../util';
import UserView from '../../components/UserView';

const useStyles = makeStyles((theme) => ({
  uploaderContainer: {
    marginBottom: theme.spacing(3),
  },
  uploaderTitle: {
    marginBottom: theme.spacing(1),
  },
}));

function DocumentInfo({ docInfo }) {
  const classes = useStyles();

  return (
    <MetadataSection title="Document Info">
      {docInfo && docInfo.Owner
          && (
          <div className={classes.uploaderContainer}>
            <Typography color="textSecondary" className={classes.uploaderTitle}>
              Uploader
            </Typography>
            <UserView userId={docInfo.Owner} />
          </div>
          )}
      {docInfo && docInfo.DateUploaded
          && <MetadataItem title="Date Uploaded" value={getFormattedDate(new Date(docInfo.DateUploaded))} />}
      {docInfo && docInfo.FileSize
          && <MetadataItem title="File Size" value={getReadableFileSize(docInfo.FileSize)} />}
    </MetadataSection>
  );
}

DocumentInfo.propTypes = {
  docInfo: PropTypes.shape({
    DateUploaded: PropTypes.string,
    FileSize: PropTypes.number,
    Owner: PropTypes.string,
  }).isRequired,
};

export default DocumentInfo;
