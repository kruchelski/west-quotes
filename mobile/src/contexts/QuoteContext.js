import React, { createContext, useState } from 'react';
import { HttpService } from '../services';

const QuoteContext = createContext();

const quoteContextApi = ( quoteState, setQuoteState ) => {
  
  const getQuote = async () => {
    try {
      const quoteResponse = await HttpService.makeRequest('getQuote', null, null, true);
      if (!quoteResponse || !quoteResponse.data) {
        throw new Error('Error requesting quote. No data from the server.');
      }

      quoteResponse.data.quoteLiked = false;

      console.log('-====QUOTE====-')
      console.log(quoteResponse.data)


      setQuoteState((prevState) => {
        return {
          ...prevState,
          ...quoteResponse.data
        }
      })
    } catch (err) {
      throw err;
    }
  }

  const likeQuote = async (quoteUuid) => {
    try {
      await HttpService.makeRequest('likeQuote', null, quoteUuid, true);
      setQuoteState(prevState => {
        return {
          ...prevState,
          quoteLiked: true
        }
      })
    } catch (err) {
      throw err;
    }
  }

  const dislikeQuote = async (quoteUuid) => {
    // TODO: implementar a lógica
  }

  const quoteErrorHandler = (errorObject, defaultMessage = null) => {

    setQuoteState((prevState) => {
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
  const initialState = {
    quote: {
      quoteBody: {
        text: null,
        uuid: null,
        occurrences: null,
        likes: null,
      },
      love: null,
      new: true,
      likers: [],
    },
    image: null,
    imageQuery: null,
  }

  const [quoteState, setQuoteState] = useState(initialState)
  const {
    getQuote,
    likeQuote,
    dislikeQuote,
    quoteErrorHandler
  } = quoteContextApi(quoteState, setQuoteState);

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