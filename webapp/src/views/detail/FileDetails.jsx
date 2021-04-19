import React from 'react';
import PropTypes from 'prop-types';
import MetadataItem from '../../components/MetadataItem';
import MetadataSection from '../../components/MetadataSection';

function FileDetails({ details }) {
  return (
    <MetadataSection title="File Details">
      {details && details.fileName
          && <MetadataItem title="Original File Name" value={details.fileName} />}
      {details && details.contentType
          && <MetadataItem title="Content Type" value={details.contentType} />}
      {details && details.encoding
          && <MetadataItem title="Encoding" value={details.encoding} />}
    </MetadataSection>
  );
}

FileDetails.propTypes = {
  details: PropTypes.shape({
    fileName: PropTypes.string,
    contentType: PropTypes.string,
    encoding: PropTypes.string,
  }).isRequired,
};

export default FileDetails;
