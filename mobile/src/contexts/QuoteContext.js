import React, { createContext, useState } from 'react';
import { HttpService } from '../services';
import { ENDPOINTS } from '../constants';

const QuoteContext = createContext();

const quoteContextApi = ( quoteState, setQuoteState ) => {
  
  const getQuote = async () => {
    // TODO: implementar a lógica
  }

  const likeQuote = async (quoteUuid) => {
    // TODO: implementar a lógica
  }

  const dislikeQuote = async (quoteUuid) => {
    // TODO: implementar a lógica
  }

  const quoteErrorHandler = (errorObject, defaultMessage = null) => {

    setAuthState((prevState) => {
      return {
        ...prevState,
        error: errorObject?.error ||
        errorObject?.message ||
        defaultMessage ||
        'An unexpected error happened with quote data',
      }
    })

  }

  return {
    getQuote,
    likeQuote,
    dislikeQuote,
    quoteErrorHandler
  }

}

const QuoteProvider = ({ children }) => {
  // TODO: Definir as propriedades do objeto inicial
  const initialState = {}

  const [quoteState, setQuoteState] = useState(initialState)
  const {
    getQuote,
    likeQuote,
    dislikeQuote,
    quoteErrorHandler
  } = authContextApi(quoteState, setQuoteState);

  return (
    <QuoteContext.Provider value={{
      quoteState,
      getQuote,
      likeQuote,
      dislikeQuote,
      quoteErrorHandler
    }}>
      { children}
    </QuoteContext.Provider>
  )
}

export { QuoteContext, QuoteProvider };