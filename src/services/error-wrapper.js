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
      message = 'Something wrong. Client default error message';
      break;
  }

  return message;
}
export default class ErrorWrapper extends Error {
  constructor(axiosError) {
    super();
    if (axiosError.response) {
      // Houve um retorno da rquisição contendo erro.
      this.type = 'response';
      this.status = axiosError.response.status;
      this.headers = axiosError.response.headers;
      this.apiData = {
        message: axiosError.response.data.message,
        messageType: axiosError.response.data.message_type,
        contentType: axiosError.response.data.content_type,
        content: axiosError.response.data.content,
        payload: axiosError.response.data.payload,
      };

      // TODO(18/12/2020): Colocar o ValidationMessage no config
      if (this.apiData.contentType === 'ValidationMessage') {
        // TODO(18/12/2020): Criar metódo para verificar string independente do case
        this.handleValidation();
      }

      console.log('validation', this.validation);
    } else if (axiosError.request) {
      // A requisição nem chegou a ser realizada.
      this.type = 'request';
    }

    this.message = getErrorMessage(this.type, this.status);
  }

  handleValidation() {
    this.validation = {
      [this.apiData.payload.field]: this.apiData.payload.message,
    };
  }
}
