import axios from 'axios';

export const URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}` : 'localhost:3001';

const api = axios.create({
  baseURL: URL,
});

export const executeLogin = async (endpoint, body, token) => {
  try {
    const result = await api.post(endpoint, body, {
      headers: {
        authorizationToken: token,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const checkToken = async (token) => {
  try {
    const result = await api.post('/token', {
      authorizationToken: token,
      methodArn: 'test-token',
    });
    return result.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

export const requestGet = async (endpoint, token) => {
  try {
    const result = await api.get(endpoint, {
      headers: {
        authorizationToken: token,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const requestPost = async (endpoint, body, token) => {
  try {
    const result = await api.post(endpoint, body, {
      headers: {
        authorizationToken: token,
      },
    });
    console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
};

export default api;
