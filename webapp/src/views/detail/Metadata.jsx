import React from 'react';
import PropTypes from 'prop-types';
import MetadataItem from '../../components/MetadataItem';
import MetadataSection from '../../components/MetadataSection';
import { getFormattedDate } from '../../util';

function Metadata({ metadata }) {
  return (
    <MetadataSection title="Document Metadata">
      {metadata && metadata.author
          && <MetadataItem title="Author" value={metadata.author} />}
      {metadata && metadata.createdDate
          && <MetadataItem title="Date Created" value={getFormattedDate(metadata.createdDate)} />}
      {metadata && metadata.modifiedDate
          && <MetadataItem title="Date Modified" value={getFormattedDate(metadata.modifiedDate)} />}
      {metadata && metadata.pageCount
          && <MetadataItem title="Page Count" value={metadata.pageCount} />}
      {metadata && metadata.title
          && <MetadataItem title="Title" value={metadata.title} />}
      {metadata && metadata.keywords
          && <MetadataItem title="Keywords" value={metadata.keywords} />}
    </MetadataSection>
  );
}

Metadata.propTypes = {
  metadata: PropTypes.shape({
    author: PropTypes.string,
    createdDate: PropTypes.string,
    modifiedDate: PropTypes.string,
    pageCount: PropTypes.number,
    title: PropTypes.string,
    keywords: PropTypes.string,
  }).isRequired,
};

export default Metadata;
