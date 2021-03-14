import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomButton, CustomInput } from '../common';
import styles from './styles';

const SignInForm = ({ signInHandler, changeFormHandler, loading, authError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
