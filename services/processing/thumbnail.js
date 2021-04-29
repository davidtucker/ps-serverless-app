import { exec } from 'child_process';
import * as path from 'path';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import { AWSClients } from '../common';

const execCommand = promisify(exec);
const s3 = AWSClients.s3();

const getCommand = (inputFile, outputFile) => {
  let command = `/opt/bin/gs`;
  command += ` -sDEVICE=png16m`;
  command += ` -dPDFFitPage=true`;
  command += ` -sPageList=1`;
  command += ` -sPAPERSIZE=a4`;
  command += ` -r150`;
  command += ` -o ${outputFile} ${inputFile}`;
  return command;
};

exports.handler = async event => {
  const timestamp = new Date().getTime();
  const inputFile = path.resolve('/tmp', `${timestamp}-input.pdf`);
  const outputFile = path.resolve('/tmp', `${timestamp}-output.png`);

  // Download file
  const getObjectParams = {
    Key: event.file.key,
    Bucket: event.file.bucket,
  };
  const data = await s3.getObject(getObjectParams).promise();
  await fs.writeFile(inputFile, data.Body);

  // Run GS command line
  await execCommand(`/opt/bin/gs --version`);
  await execCommand(getCommand(inputFile, outputFile));

  // Upload file to S3
  const thumbnailName = `${path.basename(event.file.key, '.pdf')}-thumb.png`;

  const putObjectParams = {
    Key: thumbnailName,
    Bucket: process.env.ASSET_BUCKET,
    Body: await fs.readFile(outputFile),
  };
  await s3.putObject(putObjectParams).promise();

  const output = {
    thumbnail: {
      key: thumbnailName,
      bucket: process.env.ASSET_BUCKET,
    },
  };

  return {
    ...output,
    ...event,
  };
};
