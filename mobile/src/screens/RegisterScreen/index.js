import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import { SignInForm, SignUpForm } from '../../components';
import { logo } from '../../assets';
import styles from './styles';
import {
	View,
	Image,
	Keyboard,
	Platform,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';

export default () => {
	const {
		signIn,
		signUp,
		authErrorHandler,
		authState,
		clearErrorState
	} = useAuth();
	const [showLogo, setShowLogo] = useState(true);
	const [loading, setLoading] = useState(false);
	const [isSignIn, setIsSignIn] = useState(true);
	const [signInTry, setSignInTry] = useState(false);
	const [signUpTry, setSignUpTry] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
				setShowLogo(false);
			},
		);
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setShowLogo(true);
			},
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	const validateInput = (inputType, inputValue, errors) => {
		const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		switch (inputType) {
			case 'username':
				if (!inputValue) {
					errors.push('Problem with username')
				}
				break;
			case 'email':
				if (!inputValue || !inputValue.match(emailRegex)) {
					errors.push('Problem with email');
				}
				break
			case 'password': {
				if (!inputValue || inputValue.length < 4) {
					errors.push('Problem with password');
				}
				break;
			}
		}
	}

	const validator = (inputs) => {
		let errors = [];

		for (const key in inputs) {
			validateInput(key, inputs[key], errors);
		}
		return errors.join('\n');
	}

	const handleSignIn = async (email, password) => {
		setSignInTry(true);
		clearErrorState();
		const error = validator({ email, password });
		if (error) {
			authErrorHandler({}, error);
			return;
		}
		try {
			setLoading(true);
			await signIn(email, password);
		} catch (err) {
			authErrorHandler(err, 'An unexpected error happened trying to Sign In');
			setLoading(false);
		}
	}

	const handleSignUp = async (username, email, password) => {
		setSignUpTry(true)
		clearErrorState()
		const error = validator({ username, email, password });
		if (error) {
			authErrorHandler({}, error);
			return;
		}
		try {
			setLoading(true);
			await signUp(username, email, password);
		} catch (err) {
			authErrorHandler(err, 'An unexpected error happened trying to Sign Up');
			setLoading(false);
		}
	}

	const handleFormChange = () => {
		clearErrorState();
		setSignUpTry(false);
		setSignInTry(false)
		setIsSignIn(!isSignIn);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled
			keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
		>
			<ScrollView>
				<If condition={showLogo}>
					<View style={styles.logoImageContainer}>
						<Image source={logo} style={styles.logoImage} />
					</View>
				</If>

				<If condition={isSignIn}>
					<SignInForm
						signInHandler={handleSignIn}
						changeFormHandler={handleFormChange}
						loading={loading}
						authError={authState.error}
						tried={signInTry}
					/>
				</If>

				<If condition={!isSignIn}>
					<SignUpForm
						signUpHandler={handleSignUp}
						changeFormHandler={handleFormChange}
						loading={loading}
						authError={authState.error}
						tried={signUpTry}
					/>
				</If>
			</ScrollView >
		</KeyboardAvoidingView>
	);
};
