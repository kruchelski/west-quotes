/**
 * Initial state of the authentication
 */
export const initialAuthState = {
	isLoading: true,
	accessToken: null,
	refreshToken: null,
	username: null,
	email: null
}

/**
 * Reducer for the authentication
 * @param {*} prevState 
 * @param {*} action 
 */
export const authReducer = (prevState, action) => {
	switch (action.type) {
		case 'RETRIEVE_TOKEN':
			console.log(action)
			return {
				...prevState,
				accessToken: null,
				refreshToken: action.refreshToken,
				username: null,
				email: null,
				isLoading: false
			}
		case 'SIGN_IN':
			console.log(action)
			return {
				...prevState,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken,
				username: action.username,
				email: action.email,
				isLoading: false
			}
		case 'SIGN_UP':
			console.log(action)
			return {
				...prevState,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken,
				username: action.username,
				email: action.email,
				isLoading: false
			}
		case 'SIGN_OUT':
			console.log(action)
			return {
				...prevState,
				accessToken: null,
				refreshToken: null,
				username: null,
				email: null,
				isLoading: false
			}
	}
}