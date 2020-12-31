export default {
  ORIGIN_DATATABLE_EXPIRE_MINUTES: 5,
  CATEGORY_DATATABLE_EXPIRE_MINUTES: 5,
  apiPayloadTypes: {
    SPRING_PAGINATION: 'PageImpl',
    VALIDATION_MESSAGE: 'ValidationMessage',
  },
  messages: {
    ERROR: 'error',
    SUCCESS: 'success',
  },
  events: {
    INSERT_MESSAGE: 'insert:message',
    CLEAR_MESSAGE: 'clear:message',
    DETAILS_SUBCATEGORY: 'details:subcategory',
  },
};
