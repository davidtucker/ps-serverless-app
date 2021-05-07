import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Auth } from 'aws-amplify';

const SERVICES_HOST = window.appConfig.apiEndpoint;
let client;

/* eslint-disable no-console */

const getAuthHeader = (session) => `Bearer ${session.getAccessToken().getJwtToken()}`;

// Handle token refreshing
const createAPIClient = async () => {
  console.log('Creating API Client');
  const session = await Auth.currentSession();
  client = axios.create({
    headers: {
      common: {
        Authorization: getAuthHeader(session),
      },
    },
  });
  createAuthRefreshInterceptor(client, async (request) => {
    // Recreate client and update for future requests
    await createAPIClient();
    const newSession = await Auth.currentSession();
    // Update the Auth header for current request
    request.response.config.headers.Authorization = getAuthHeader(newSession);
  });
};

// Documents ---------------------------------------------------------

export const getAllDocuments = async () => {
  if (!client) {
    await createAPIClient();
  }
  const { data } = await client.get(`${SERVICES_HOST}/documents/`);
  return data;
};

export const getDocument = async (id) => {
  if (!client) {
    await createAPIClient();
  }
  const { data } = await client.get(`${SERVICES_HOST}/documents/${id}`);
  console.log(`Data: ${JSON.stringify(data)}`);
  return data;
};

export const deleteDocument = async (id) => {
  if (!client) {
    await createAPIClient();
  }
  await client.delete(`${SERVICES_HOST}/documents/${id}`);
};

export const uploadDocument = async (name, tags, file) => {
  if (!client) {
    await createAPIClient();
  }
  const formData = new FormData();
  formData.append('name', name);
  formData.append('tags', tags.join(','));
  formData.append('file', file);
  const result = await client.post(`${SERVICES_HOST}/documents/`, formData);
  console.log(`Result from Upload: ${JSON.stringify(result)}`);
};

// Users

let userProfileData;

export const getAllUsers = async () => {
  if (!client) {
    await createAPIClient();
  }
  const results = await client.get(`${SERVICES_HOST}/users/`);
  console.log(`Results: ${JSON.stringify(results)}`);
  return results.data.users;
};

export const createNewUser = async (email, name, group) => {
  if (!client) {
    await createAPIClient();
  }
  const body = { email, name, group };
  console.log(`Body: ${JSON.stringify(body)}`);
  const results = await client.post(`${SERVICES_HOST}/users/`, body);
  console.log(`Results: ${JSON.stringify(results)}`);
};

export const deleteUser = async (id) => {
  if (!client) {
    await createAPIClient();
  }
  await client.delete(`${SERVICES_HOST}/users/${id}`);
};

export const getAllUserProfiles = async () => {
  if (!client) {
    await createAPIClient();
  }
  const results = await client.get(`${SERVICES_HOST}/users/profiles`);
  console.log(`Results: ${JSON.stringify(results)}`);
  return results.data.users;
};

export const getProfileData = async (userId, forceRefresh = false) => {
  if (!userProfileData || forceRefresh) {
    userProfileData = await getAllUserProfiles();
    console.log(`User Profile Data: ${JSON.stringify(userProfileData)}`);
  }
  const user = userProfileData.find((u) => u.userId === userId);
  return user;
};

export const getCurrentUserProfile = async () => {
  if (!client) {
    await createAPIClient();
  }
  const results = await client.get(`${SERVICES_HOST}/users/profile`);
  console.log(`Results: ${JSON.stringify(results)}`);
  return results.data.user;
};

export const updateCurrentUserProfile = async (name, shouldDeletePicture, picture) => {
  if (!client) {
    await createAPIClient();
  }
  const formData = new FormData();
  if (name) {
    formData.append('name', name);
  }
  if (shouldDeletePicture) {
    formData.append('deletePicture', true);
  }
  if (picture) {
    formData.append('picture', picture);
  }
  const results = await client.patch(`${SERVICES_HOST}/users/profile`, formData);
  console.log(`Results: ${JSON.stringify(results)}`);
  return results.data.user;
};

// Comments --------------------------------------------------------------

export const createComment = async (id, content) => {
  if (!id) {
    throw new Error('Must have document ID');
  }
  if (!client) {
    await createAPIClient();
  }
  const body = {
    Comment: content,
  };
  const results = await client.post(`${SERVICES_HOST}/comments/${id}`, body);
  console.log(`Results: ${JSON.stringify(results)}`);
};

export const getCommentsForDocument = async (id) => {
  if (!client) {
    await createAPIClient();
  }
  const results = await client.get(`${SERVICES_HOST}/comments/${id}`);
  const sortedResults = results.data.sort((a, b) => new Date(b.DateAdded) - new Date(a.DateAdded));
  return sortedResults;
};

export const reportCommentForModeration = async (id) => {
  if (!client) {
    await createAPIClient();
  }
  const body = {
    CommentId: id,
  };
  await client.post(`${SERVICES_HOST}/moderate/`, body);
};

/* eslint-enable no-console */
