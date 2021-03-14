import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomButton, CustomInput } from '../common';
import { mainTheme, appFonts } from '../../constants';
import styles from './styles';

const SignInForm = ({ signInHandler, changeFormHandler, loading, authError, tried }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getErrorMsg = (inputType) => {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let errors = [];
    if (!tried) {
      return '';
    }
    switch(inputType) {
      case 'email':
        if (!email) {
          errors.push('Email must not be blank');
        };
        if (!email.match(emailRegex)) {
          errors.push('Email is invalid');
        }
        break;
      case 'password': {
        if (!password) {
          errors.push('Password must not be blank');
        };
        if (password.length < 4) {
          errors.push('Password must have at least 4 characters')
        }
        break;
      }
      default:
        errors = [];
    }

    return errors.join('\n');
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>
        Login
      </Text>

      <CustomInput
        level='primary'
        icon='envelope'
        label='Email'
        placeholder='Enter your email'
        value={email}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setEmail(text)}
        errorMessage={getErrorMsg('email')}
        errorStyle={
          {
            color: mainTheme.danger,
            fontFamily: appFonts.regularItalic
          }
        }
      />
      <CustomInput
        level='primary'
        icon='key'
        label='Password'
        placeholder='Enter your password'
        value={password}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        errorMessage={getErrorMsg('password')}
        errorStyle={
          {
            color: mainTheme.danger,
            fontFamily: appFonts.regularItalic
          }
        }
      />

      <If condition={authError}>
        <View>
          <Text style={styles.error}>
            {authError}
          </Text>
        </View>
      </If>

      <CustomButton
        loading={loading}
        type='solid'
        title="Login"
        level='primary'
        icon='sign-in-alt'
        onPress={() => { signInHandler(email, password); }}
      />

      <Text style={styles.text}>
        Don't have an account?
      </Text>
      <CustomButton
        type='clear'
        title="Create new account!"
        level='secondary'
        icon={null}
        onPress={() => { changeFormHandler(); }}
      />
    </View>
  );
};

export default SignInForm;
