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

/**
 * Object {
  "image": "https://images.unsplash.com/photo-1544200502-6652e105f865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTI5ODZ8MHwxfHNlYXJjaHwxOHx8bWUlMjBvZnxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080",
  "imageQuery": "me of",
  "quote": Object {
    "likers": Array [],
    "love": 0,
    "new": true,
    "quoteBody": Object {
      "likes": 0,
      "occurrences": 1,
      "text": "One of my favorite of many things about what the Trump hat represents to me is that people can't tell me what to do because I'm black",
      "uuid": "6ff811de-953c-4a5c-a0b8-f538d4e0b778",
    },
    "userLikes": 0,
  },
}
 */