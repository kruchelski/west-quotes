import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomButton, CustomInput } from '../common';
import { mainTheme, appFonts } from '../../constants'; 
import styles from './styles';

const SignUpForm = ({ signUpHandler, changeFormHandler, loading, authError, tried }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getErrorMsg = (inputType) => {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let errors = [];
    if (!tried) {
      return '';
    }
    switch(inputType) {
      case 'username': 
        if (!username) {
          errors.push('Username must not be blank');
        }
        break;
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
        SignUp
      </Text>

      <CustomInput
        level='primary'
        icon='user'
        label='Username'
        placeholder='Enter your username'
        value={username}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setUsername(text)}
        errorMessage={getErrorMsg('username')}
        errorStyle={
          {
            color: mainTheme.danger,
            fontFamily: appFonts.regularItalic
          }
        }
      />
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
        title="Create account"
        level='primary'
        icon='user-plus'
        onPress={() => { signUpHandler(username, email, password); }}
      />

      <Text style={styles.text}>
        Already have an account?
      </Text>
      <CustomButton
        type='clear'
        title="Login with existing account"
        level='secondary'
        icon={null}
        onPress={() => { changeFormHandler(); }}
      />
    </View>
  );
};

export default SignUpForm;
