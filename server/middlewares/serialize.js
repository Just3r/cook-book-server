import APIError from '../helpers/APIError';
import httpStatus from 'http-status';

export default (response) => {
    if(!response) return new APIError('No such ingridient exists!', httpStatus.NOT_FOUND)
    return {
      data: response
    }
  }

