/**
 * Notifications Service
 *
 * This is a microservice that is used in the Pluralsight path on Serverless
 * architecture.
 *
 * @author David Tucker <david@mindmill.co>
 */

 import { AWSClients } from '../common';

 const ses = AWSClients.ses();
 
 // Get Environment Variable Values
 const emailAddress = process.env.EMAIL_ADDRESS;
 
 const sendEmail = async (message, subject) => {
   const params = {
     Destination: {
       ToAddresses: emailAddress,
     },
     Message: {
       Body: {
         Text: {
           Data: message,
         },
       },
       Subject: {
         Data: `[Globomantics DMS] ${subject}`,
       },
     },
     Source: emailAddress,
   };
   return ses.sendEmail(params).promise();
 };
 
 const handleProcessingFailed = async event => {
   const owner = event.detail?.owner;
   const filename = event.detail?.filename;
 
   if (!owner || !filename) {
     throw new Error('Did not receive owner and or filename with event');
   }
 
   const message = `Your file, ${filename}, failed to process. It may be encrypted. Please update your file and try again.`;
   const subject = `Document Failed Processing`;
   try {
     await sendEmail(message, subject);
   } catch (error) {
     console.error(`Could not send email on FailedProcessing event: ${error}`);
   }
 };
 
 const handleCommentAdded = async event => {
   const { documentId, commentId } = event.detail;
   if (!documentId || !commentId) {
     console.error('Document ID and Comment ID not provided for notification from EventBridge');
     throw new Error('Could not send notifications for a comment');
   }
 
   const message = `Document Comment`;
   const subject = `Comment left on document ${documentId}`;
 
   try {
     await sendEmail(message, subject);
   } catch (error) {
     console.error(`Could not send email on FailedProcessing event: ${error}`);
   }
 };
 
 export const handler = async (event, context) => {
   const { source } = event;
   const detailType = event['detail-type'];
 
   if (source === 'com.globomantics.dms.processing' && detailType === 'ProcessingFailed') {
     return handleProcessingFailed(event, context);
   }
   if (source === 'com.globomantics.dms.comments' && detailType === 'CommentAdded') {
     return handleCommentAdded(event, context);
   }
 
   console.error(`Notification event not handled: ${JSON.stringify(event)}`);
   throw new Error('Event not handled');
 };