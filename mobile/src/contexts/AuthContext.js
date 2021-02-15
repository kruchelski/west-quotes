import React, { createContext } from 'react';
import { AuthReducer } from '../reducers';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return(
    <AuthContext.Provider value = { AuthReducer.authReducerApi() }>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };