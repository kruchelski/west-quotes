import React, { useState, useEffect } from 'react';
import { View, Image, Keyboard } from 'react-native';
import { useAuth } from '../../hooks';
import { SignInForm, SignUpForm } from '../../components';
import { logo } from '../../assets';
import styles from './styles';

export default ({ navigation, route }) => {
	const { signIn, signUp, authErrorHandler, authState } = useAuth();
	const [showLogo, setShowLogo] = useState(true);
	const [loading, setLoading] = useState(false);
	const [isSignIn, setIsSignIn] = useState(true);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
				setShowLogo(false);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setShowLogo(true);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, [])

	const handleSignIn = async (email, password) => {
		try {
			setLoading(true);
			await signIn(email, password);
		} catch (err) {
			authErrorHandler(err, 'An unexpected error happened trying to Sign In');
		} finally {
			setLoading(false);
		}
	}

	const handleSignUp = async (username, email, password) => {
		try {
			setLoading(true);
			await signUp(username, email, password);
		} catch (err) {
			authErrorHandler(err, 'An unexpected error happened trying to Sign Up');
		} finally {
			setLoading(false);
		}
	}

	const handleFormChange = () => {
		setIsSignIn(!isSignIn);
	}

	return (
		<View style={styles.container}>
			{
				showLogo &&
				<View style={styles.logoImageContainer}>
					<Image source={logo} style={styles.logoImage} />
				</View>
			}
			{
				isSignIn &&
				<SignInForm
					signInHanlder={handleSignIn}
					changeFormHandler={handleFormChange}
					loading={loading}
					authError={authState.error}
				/>
			}
			{
				!isSignIn &&
				<SignUpForm
					signUpHanlder={handleSignUp}
					changeFormHandler={handleFormChange}
					loading={loading}
					authError={authState.error}
				/>
			}
		</View >
	);
}