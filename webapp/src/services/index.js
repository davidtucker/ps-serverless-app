import axios from 'axios';
import * as mock from './mockData';

const SERVICES_HOST = window.appConfig.apiEndpoint;

/* eslint-disable no-console */

// Documents ---------------------------------------------------------

export const getAllDocuments = async () => {
  console.log('[MOCK] Get all documents');
  return mock.mockCall(mock.allDocuments, 1000);
};

export const getDocument = async (id) => {
  const document = mock.documents.find((d) => d.PK === id);
  console.log(`[MOCK] Get Document: ${id}`);
  return mock.mockCall(document, 1000);
};

export const deleteDocument = async (id) => {
  console.log(`[MOCK] Delete document: ${id}`);
  return mock.mockCall({}, 1000);
};

export const uploadDocument = async (name, tags, file) => {
  console.log(`[MOCK] Upload document: ${name} ${tags} File: ${file.fileName}`);
  return mock.mockCall({}, 2000);
};

// Users

export const getAllUsers = async () => {
  console.log('[MOCK] Get all users');
  return mock.mockCall(mock.allUsers, 2500);
};

export const createNewUser = async (email, name, group) => {
  console.log(`[MOCK] Create New User: ${email} ${name} ${group}`);
  return mock.mockCall({}, 1000);
};

export const deleteUser = async (id) => {
  console.log(`[MOCK] Delete User: ${id}`);
  return mock.mockCall({}, 1000);
};

export const getAllUserProfiles = async () => {
  console.log('[MOCK] Get All User Profiles');
  return mock.mockCall(mock.profiles, 1000);
};

export const getCurrentUserProfile = async () => {
  console.log('[MOCK] Get current user profile');
  return mock.mockCall(mock.profile, 1000);
};

export const updateCurrentUserProfile = async (name, shouldDeletePicture, picture) => {
  console.log(`[MOCK] Update Current User ${name} Delete Pic: ${shouldDeletePicture} Pic: ${picture}`);
  return mock.mockCall({}, 1000);
};

// Comments --------------------------------------------------------------

export const createComment = async (id, content) => {
  const body = {
    Comment: content,
  };
  const results = await axios.post(`${SERVICES_HOST}/comments/${id}`, body);
  console.log(`Results: ${JSON.stringify(results)}`);
};

export const getCommentsForDocument = async (id) => {
  const results = await axios.get(`${SERVICES_HOST}/comments/${id}`);
  const sortedResults = results.data.sort((a, b) => new Date(b.DateAdded) - new Date(a.DateAdded));
  return sortedResults;
};

export const reportCommentForModeration = async (id) => {
  const body = {
    CommentId: id,
  };
  await axios.post(`${SERVICES_HOST}/moderate`, body);
};

/* eslint-enable no-console */
