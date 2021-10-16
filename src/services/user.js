/* eslint-disable no-console */
import axios from 'axios';

const URL = '/api/auth/update-password/';

export const userUpdate = (values, onError = () => {}) => axios.put(URL, values)
  .catch((error) => {
    onError(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response;
    } if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
    return false;
  });

export default { userUpdate };
