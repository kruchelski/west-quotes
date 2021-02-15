import { useReducer } from 'react';
import { HttpService, UserService, StorageService } from '../services';
import { setDefaultHeaders } from '../config/RequestConfig';


const initialState = {
  user: null,
  refreshToken: null,
  accessToken: null,
  error: null
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...state,
        refreshToken: action.payload.refreshToken,
      }
    case 'SIGN_IN':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      }
    case 'SIGN_OUT':
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        user: null
      }
    case 'ERROR':
      return {
        ...state,
        error: `[Authentication Error] ${action.payload.error || 'Unexpected error happened'}. Check data and try again`,
      }
  }
}

const authReducerApi = () => {

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadStorageData = async () => {
    try {
      // Retrieves the user and the refreshToken from the localStorage
      const storageUser = await UserService.getUserFromStorage();
      const storageRefreshToken = await UserService.getRefreshTokenFromStorage();

      if (!storageRefreshToken) {

        dispatch({ type: 'SIGN_OUT' });

      } else {

        console.log('Tyring to get refresh token data')

        // In case there's a refresh token stored, tries to get a new access token
        const response = await httpService.tokenRenewal(null, false, false);

        // Checks the content of response
        if (response?.data?.accessToken) {

          // Sets the user
          if (response?.data?.user || storageUser) {

            // Updates the storage with the user
            await UserService.setUserInStorage(response.data.user);

            // Tries to get the user returned from the back end
            dispatch({
              type: 'SIGN_IN',
              payload: {
                refreshToken: storageRefreshToken,
                user: response.data.user || storageUser,
                accessToken: response.data.accessToken
              }
            })

          } else {

            // If no user is found, set an error state
            dispatch({
              type: 'ERROR',
              payload: {
                error: 'Failed to retrieve user from database and local storage',
              }
            })
          }

        } else {

          // If there's no accessToken in the response
          dispatch({
            type: 'ERROR',
            payload: {
              error: 'Failed to get a new access token',
            }
          })

        }
      }

    } catch (err) {

      // In case any error happens
      console.log('[AuthReducer - loadStorageData] ERROR!'); // TODO: temp

      dispatch({
        type: 'ERROR',
        payload: {
          error: err.error || err.message || 'An unexpected error happened while trying to authenticate',
        }
      })

    }
  }

  const signIn = async (email, password) => {
    try {

      // const authRequestBody = {
      //   email: email.trim(),
      //   password
      // }

      const authRequestBody = {
        email: 'nhoca@teste.com',
        password: 'plup'
      }

      // Makes request to login
      const response = await HttpService.makeRequest('signIn', authRequestBody, null, false);
      console.log('resposta do signIn');
      console.log(response.data);

      // If the response is missing some data then set as error
      if (!response || !response.data || !response.data.user || !response.data.accessToken || !response.data.refreshToken) {

        dispatch({
          type: 'ERROR',
          payload: {
            error: 'Failed to get user authentication data from the server',
          }
        })

      } else {

        // Saves the user and the refresh token in the async storage
        await UserService.setUserInStorage(response.data.user);
        await UserService.setRefreshTokenInStorage(response.data.refreshToken);

        // Sets the default header
        setDefaultHeaders('Authorization', response.data.accessToken);

        dispatch({
          type: 'SIGN_IN',
          payload: {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            user: response.data.user
          }
        })


      }

    } catch (err) {

      // In case any error happens
      console.log('[AuthReducer - signIn] ERROR!'); // TODO: temp

      dispatch({
        type: 'ERROR',
        payload: {
          error: err.error || err.message || 'An unexpected error happened while trying to authenticate',
        }
      })

    }
  }

  const signUp = async (username, email, password) => {
		try {

      // const requestSignUpBody = {
      //   username: username.trim(),
      //   email: email.trim(),
      //   password,
      // }

			const requestSignUpBody = {
				username: 'nilce',
				email: 'nilce@teste.com',
				password: 'nilce'
			}

			// Makes the request to register an user
			const response = await httpService.makeRequest('signUp', requestSignUpBody, null, false);

			// If there's missing data in the response set user as null and se an error
			if (!response || !response.data || !response.data.uuid) {
        dispatch({
          type: 'ERROR',
          payload: {
            error: 'Failed to get user register data from the server',
          }
        })

			} else {

				// Calls the signIn function
				await signIn(email, password);
			}
		} catch (err) {

			// In case any error happens
      console.log('[AuthReducer - signUp] ERROR!'); // TODO: temp

      dispatch({
        type: 'ERROR',
        payload: {
          error: err.error || err.message || 'An unexpected error happened while trying to register',
        }
      })

		}
	}

  const signOut = async () => {
		try {
      if (!state.user || !state.user.uuid) {
        await StorageService.clearStorage();
        removeDefaultHeader('Authorization');
        dispatch({
          type: 'SIGN_OUT',
        })
        return;
      }
			
      // Makes request to logout user
			await httpService.makeRequest('signOut', false, state.user.uuid, false);

			// Clear the storage
			await StorageService.clearStorage();

			// Remove default Authorization header
			removeDefaultHeader('Authorization');

		} catch (err) {

				// In case any error happens
        console.log('[AuthReducer - signOut] ERROR!'); // TODO: temp

        dispatch({
          type: 'ERROR',
          payload: {
            error: err.error || err.message || 'An unexpected error happened while trying to sign out',
          }
        })
		
		} finally {

			await StorageService.clearStorage();

		}
	}

  // Return functions and state
  return {
    state,
    loadStorageData,
    signUp,
    signIn,
    signOut
  }

}

export { authReducer, initialState, authReducerApi }