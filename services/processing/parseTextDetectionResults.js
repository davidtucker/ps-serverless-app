import { AWSClients } from '../common';

const textract = AWSClients.textract();

const getTextDetectionResults = async (event, nextToken = null) => {
  const { jobId } = event.textDetection;
  const params = {
    JobId: jobId,
    MaxResults: 1000,
  };
  if (nextToken) {
    params.NextToken = nextToken;
  }
  const data = await textract.getDocumentTextDetection(params).promise();
  let textOutput = '';

  if (data.JobStatus === 'SUCCEEDED') {
    // Get blocks that are 'words' (and not pages or lines)
    const lineBlocks = data.Blocks.filter(b => b.BlockType === 'WORD');
    // Get an array of text values from these blocks
    const textFromLineBlocks = lineBlocks.map(b => b.Text);
    // Join this array of text together, by putting a space between each element
    textOutput = textFromLineBlocks.join(' ').trim();

    if (data.NextToken) {
      // Delay 1 second to avoid exceeding provisioned rate for Textract
      await new Promise(r => setTimeout(r, 1000));
      const { outputText: nextText } = await getTextDetectionResults(event, data.NextToken);
      if (nextText) {
        textOutput += ` ${nextText}`;
      }
    }
  } else if (data.JobStatus === 'FAILED') {
    throw new Error('Could not detect text from document');
  }

  return {
    jobId,
    jobStatus: data.JobStatus,
    textOutput,
  };
};

exports.handler = async event => {
  const { jobId } = event.textDetection;
  console.info(`Getting text detection results. JOB ID: ${jobId}`);
  const results = await getTextDetectionResults(event);
  return {
    ...event,
    textDetection: results,
  };
};
