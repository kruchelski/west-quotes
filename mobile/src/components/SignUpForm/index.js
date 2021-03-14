import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomButton, CustomInput } from '../common';
import styles from './styles';

const SignUpForm = ({ signUpHandler, changeFormHandler, loading, authError }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
