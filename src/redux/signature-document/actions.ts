export const prefix = "signatureDocuments";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT,
});

export const QUOTEDOCUMENT_LIST_REQUEST = `${prefix}/QUOTEDOCUMENT_LIST_REQUEST`;
export const QUOTEDOCUMENT_LIST_SUCCESS = `${prefix}/QUOTEDOCUMENT_LIST_SUCCESS`;
export const QUOTEDOCUMENT_LIST_FAILURE = `${prefix}/QUOTEDOCUMENT_LIST_FAILURE`;

export const getQuotesList = (status: any) => ({
  promise: (api: any) => api.quotes.quotesList(status),
  types: [
    QUOTEDOCUMENT_LIST_REQUEST,
    QUOTEDOCUMENT_LIST_SUCCESS,
    QUOTEDOCUMENT_LIST_FAILURE,
  ],
});

export const QUOTE_REQUEST = `${prefix}/QUOTE_REQUEST`;
export const QUOTE_SUCCESS = `${prefix}/QUOTE_SUCCESS`;
export const QUOTE_FAILURE = `${prefix}/QUOTE_FAILURE`;

export const getQuote = (quoteId: any) => ({
  promise: (api: any) => api.quotes.quote(quoteId),
  types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE],
});

export const SIGNATURE_EVENT_REQUEST = `${prefix}/SIGNATURE_EVENT_REQUEST`;
export const SIGNATURE_EVENT_SUCCESS = `${prefix}/SIGNATURE_EVENT_SUCCESS`;
export const SIGNATURE_EVENT_FAILURE = `${prefix}/SIGNATURE_EVENT_FAILURE`;

export const getSignatureEvents = (quoteId: any) => ({
  //promise: (api: any) => api.quotes.quote(quoteId),
  //types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE],
});
