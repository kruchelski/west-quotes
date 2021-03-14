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

const RegisterScreen = () => {
  const { signIn, signUp, authErrorHandler, authState } = useAuth();
  const [showLogo, setShowLogo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

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

  const handleSignIn = async (email, password) => {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (err) {
      authErrorHandler(err, 'An unexpected error happened trying to Sign In');
      setLoading(false);
    }
  };

  const handleSignUp = async (username, email, password) => {
    try {
      setLoading(true);
      await signUp(username, email, password);
    } catch (err) {
      authErrorHandler(err, 'An unexpected error happened trying to Sign Up');
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 60 })}
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
          />
        </If>

        <If condition={!isSignIn}>
          <SignUpForm
            signUpHandler={handleSignUp}
            changeFormHandler={handleFormChange}
            loading={loading}
            authError={authState.error}
          />
        </If>
      </ScrollView >
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
