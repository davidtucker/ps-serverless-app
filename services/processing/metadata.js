import * as path from 'path';
import { PDFDocument } from 'pdf-lib';
import { AWSClients } from '../common';

const s3 = AWSClients.s3();

const getMetadataFromDocument = doc => {
  return {
    author: doc.getAuthor(),
    createdDate: doc.getCreationDate(),
    modifiedDate: doc.getModificationDate(),
    pageCount: doc.getPageCount(),
    title: doc.getTitle(),
    keywords: doc.getKeywords(),
  };
};

exports.handler = async event => {
  // Make sure we are getting an S3 event
  if (event.source !== 'aws.s3') {
    throw new Error('Invalid source event');
  }

  // Check file extension
  const extension = path.extname(event.detail.requestParameters.key);
  if (extension.toLowerCase() !== '.pdf') {
    throw new Error('Unsupported file type');
  }

  // Download file
  const getObjectParams = {
    Key: event.detail.requestParameters.key,
    Bucket: event.detail.requestParameters.bucketName,
  };
  const data = await s3.getObject(getObjectParams).promise();

  // Get PDF metadata
  const metadataParams = {
    updateMetadata: false,
  };
  const document = await PDFDocument.load(data.Body, metadataParams);
  const metadata = getMetadataFromDocument(document);

  // Upload to Assets Bucket
  const putObjectParams = {
    Key: event.detail.requestParameters.key,
    Bucket: process.env.ASSETS_BUCKET,
    Body: data.Body,
  };
  await s3.putObject(putObjectParams).promise();

  return {
    file: {
      key: event.detail.requestParameters.key,
      bucket: event.detail.requestParameters.bucketName,
      size: data.Body.length,
    },
    metadata,
  };
};
