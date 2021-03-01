import React, { createContext, useState } from 'react';
import { HttpService, UserService, StorageService } from '../services';
import { setDefaultHeaders, removeDefaultHeader } from '../config/RequestConfig';

const AuthContext = createContext();

const authContextApi = ( authState, setAuthState ) => {
  
  const loadStorageData = async () => {
    try {
      // Retrieves the user and the refreshToken from the localStorage
      const storageUser = await UserService.getUserFromStorage();
      const storageRefreshToken = await UserService.getRefreshTokenFromStorage();

      if (!storageRefreshToken) {

        try {
          await signOut()

        } catch (err) {
          throw err;
        }

      } else {

        // In case there's a refresh token stored, tries to get a new access token
        const response = await HttpService.tokenRenewal(null, false, false);

        // Checks the content of response
        if (response?.data?.accessToken) {

          // Sets the user
          if (response?.data?.user || storageUser) {

            // Updates the storage with the user
            await UserService.setUserInStorage(response.data.user);

            setAuthState((prevState) => {
              return {
                ...prevState,
                refreshToken: storageRefreshToken,
                user: response.data.user || storageUser,
                accessToken: response.data.accessToken,
                error: null
              }
            })

          } else {

            // If no user is found, set an error state
            throw new Error('Failed to retrieve user from database and local storage');

          }

        } else {

          // If there's no accessToken in the response
          throw new Error('Failed to get a new access token');
          
        }
      }

    } catch (err) {

      throw err;

    }
  }

  const signIn = async (email, password) => {
    try {

      const authRequestBody = {
        email: email.trim(),
        password
      }

      // Makes request to login
      const response = await HttpService.makeRequest('signIn', authRequestBody, null, false);

      // If the response is missing some data then set as error
      if (!response || !response.data || !response.data.user || !response.data.accessToken || !response.data.refreshToken) {

        throw new Error('Failed to get user authentication data from the server');

      } else {

        // Saves the user and the refresh token in the async storage
        await UserService.setUserInStorage(response.data.user);
        await UserService.setRefreshTokenInStorage(response.data.refreshToken);

        // Sets the default header
        setDefaultHeaders('Authorization', response.data.accessToken);


        setAuthState((prevState) => {
          return {
            ...prevState,
            refreshToken: response.data.refreshToken,
            user: response.data.user,
            accessToken: response.data.accessToken,
            error: null,
          }
        })
      }

    } catch (err) {

      throw err;

    }
  }

  const signUp = async (username, email, password) => {
    try {

      const requestSignUpBody = {
        username: username.trim(),
        email: email.trim(),
        password,
      }

      // Makes the request to register an user
      const response = await HttpService.makeRequest('signUp', requestSignUpBody, null, false);

      // If there's missing data in the response set user as null and se an error
      if (!response || !response.data || !response.data.uuid) {

        throw new Error('Failed to get user register data from the server')

      } else {

        // Calls the signIn function
        await signIn(email, password);
      }
    } catch (err) {

      throw err;

    }
  }

  const signOut = async () => {
    try {
      if (!authState.user || !authState.user.uuid) {
        await StorageService.clearStorage();
        removeDefaultHeader('Authorization');
        setAuthState((prevState) => {
          return {
            ...prevState,
            refreshToken: null,
            user: null,
            accessToken: null,
            error: null,
          }
        })
        return;
      }

      // Makes request to logout user
      await HttpService.makeRequest('signOut', false, authState.user.uuid, false);

      // Remove default Authorization header
      removeDefaultHeader('Authorization');

      await StorageService.clearStorage();

      setAuthState((prevState) => {
        return {
          ...prevState,
          refreshToken: null,
          user: null,
          accessToken: null,
          error: null,
        }
      })

    } catch (err) {

      throw err;

    }
  }

  const authErrorHandler = (errorObject, defaultMessage = null) => {

    setAuthState((prevState) => {
      return {
        ...prevState,
        error: errorObject?.error ||
        errorObject?.message ||
        defaultMessage ||
        'An unexpected error happened',
      }
    })

  }

  return {
    loadStorageData,
    signIn,
    signUp,
    signOut,
    authErrorHandler
  }
}

const AuthProvider = ({ children }) => {
  const initialState = {
    accessToken: null,
    refreshToken: null, 
    user: null, 
    error: null
  }

  const [authState, setAuthState] = useState({ ...initialState })
  const { 
    loadStorageData, 
    signIn, 
    signUp, 
    signOut,
    authErrorHandler } = authContextApi(authState, setAuthState);

  return (
    <AuthContext.Provider value={{
      authState,
      loadStorageData,
      signIn,
      signUp,
      signOut,
      authErrorHandler
    }}>
      { children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };