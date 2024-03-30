/**
 * This is API client we can use it for api call.
 */
import axios from 'axios';
import Strings from '../utils/Strings.json';

axios.defaults.timeout = 30000;
axios.defaults.timeoutErrorMessage = Strings.serverNotResponse;

export const useAxios = async (axiosParams: any) => {
  return new Promise((resolve, reject) => {
    axios
      .request(axiosParams)
      .then(response => {
        resolve(response?.data);
      })
      .catch(error => {
        console.log('Error Response  : ', error?.response);

        if (error?.message === Strings.serverNotResponse) {
          reject(error?.message);
        } else if (error.response?.status.toString().includes('5')) {
          reject(Strings.somethingWentWrong);
        } else {
          console.log('Return Err Msg : ', error?.response?.data?.error_msg);
          const errMsg = error?.response?.data?.error_msg
            ? error?.response?.data?.error_msg
            : Strings.somethingWentWrong;
          reject(errMsg);
        }
      });
  });
};
