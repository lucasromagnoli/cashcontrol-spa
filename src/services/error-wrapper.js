import { equalsIgnoreCase } from '@/core/utils';
import config from '@/core/config';

function getErrorMessage({ type, status }) {
  if (type === 'request') {
    return 'Connection Refused';
  }

  let message = '';
  switch (status) {
    case 200:
      message = 'All done. Request successfully executed';
      break;
    case 201:
      message = 'Data successfully created';
      break;
    case 400:
      message = 'Bad Request';
      break;
    case 401:
      message = 'Need auth';
      break;
    case 404:
      message = 'Not found';
      break;
    case 503:
      message = 'Service unavailable. Try again later';
      break;
    default:
      message = 'Something wrong. Cash Control API is running and healthy? ';
      break;
  }

  return message;
}

// TODO(31/12/2020): Verificar a necessidade de levar para o config.js
const ErrorTypes = {
  response: 'response',
  request: 'request',
};

export default class ErrorWrapper extends Error {
  constructor(axiosError) {
    super();
    if (axiosError.response) {
      // Houve um retorno da requisição contendo erro.
      this.type = ErrorTypes.response;
      this.status = axiosError.response.status;
      this.headers = axiosError.response.headers;
      this.apiData = {
        message: axiosError.response.data.message,
        messageType: axiosError.response.data.message_type,
        contentType: axiosError.response.data.content_type,
        content: axiosError.response.data.content,
        payload: axiosError.response.data.payload,
      };

      if (this.isValidationError()) {
        this.handleValidation();
      }
    } else if (axiosError.request) {
      // A requisição nem chegou a ser realizada.
      this.type = ErrorTypes.request;
    }

    this.httpMessage = getErrorMessage(this.type, this.status);
  }

  handleValidation() {
    this.validation = {
      [this.apiData.payload.field]: this.apiData.payload.message,
    };
  }

  getDisplayMessage() {
    return this.apiData?.message || this.httpMessage;
  }

  isValidationError() {
    return equalsIgnoreCase(this.apiData?.contentType, config.apiPayloadTypes.VALIDATION_MESSAGE);
  }
}
