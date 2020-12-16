export default class ResponseWrapper {
  constructor(axios) {
    this.statusCode = axios.status;
    this.handleApiResponse(axios.data);
    console.log(this);
  }

  handleApiResponse({ message, message_type: messageType, payload }) {
    this.apiMessage = message;
    this.apiMessageType = messageType;
    const { content } = payload;

    if (!content) {
      this.apiContent = [];
    } else {
      this.apiContent = content;
    }
  }
}
