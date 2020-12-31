import config from '@/core/config';
import { equalsIgnoreCase } from '@/core/utils';

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
    const payloadIsPage = equalsIgnoreCase(contentType, config.apiPayloadTypes.SPRING_PAGINATION);

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
