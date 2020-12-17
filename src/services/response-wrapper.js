import config from '@/core/config';

export default class ResponseWrapper {
  constructor(axiosResponse) {
    this.statusCode = axiosResponse.status;
    console.log(axiosResponse.data);
    this.handleApiResponse(axiosResponse.data);
    console.log(this);
  }

  handleApiResponse({
    message, message_type: messageType, content_type: contentType, payload,
  }) {
    const { content } = payload;
    const payloadIsPage = contentType === config.apiClassNames.PAGE_CLASS;

    this.apiMessage = message;
    this.apiMessageType = messageType;
    this.contentType = contentType;
    if (!content && !payload) {
      this.apiContent = payloadIsPage ? [] : {};
    } else {
      this.apiContent = payloadIsPage ? content : payload;
    }
  }
}
