/* eslint-disable no-console */
import axios from 'axios';

const URL = '/api/users/';

export const userGetAll = () => axios.get(URL)
  .then((res) => (res.data.data.map((item) => ({
    ...item,
    filter: true,
    search: Object.entries(item).reduce((str, [key, val]) => ((key === 'createdAt' || key === 'updatedAt' || key === '_id') ? str : `${str}${val}`), '').toLowerCase(),
  }))));

export const userDelete = (id, onError = () => {}) => axios.delete(`${URL}${id}/`)
  .catch((error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  })
  .catch((error) => {
    onError(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

export const userCreate = (values, onError = () => {}) => axios.post(URL, values)
  .then((res) => {
    if (res.status === 201) {
      return {
        status: res.status,
        data: {
          ...res.data.data,
          filter: true,
          search: Object.entries(res.data.data).reduce((str, [key, val]) => ((key === 'createdAt' || key === 'updatedAt' || key === '_id') ? str : `${str}${val}`), '').toLowerCase(),
        },
      };
    }
    return res;
  })
  .catch((error) => {
    onError(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

export const userEdit = (_id, values, onError = () => {}) => axios.put(`${URL}${_id}/`, values)
  .then((res) => {
    if (res.status === 200) {
      return {
        status: res.status,
        data: {
          ...res.data.data,
          filter: true,
          search: Object.entries(res.data.data).reduce((str, [key, val]) => ((key === 'createdAt' || key === 'updatedAt' || key === '_id') ? str : `${str}${val}`), '').toLowerCase(),
        },
      };
    }
    return res;
  })
  .catch((error) => {
    onError(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

export default {
  userGetAll, userCreate, userEdit, userDelete,
};
