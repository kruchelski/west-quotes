import React, { useState } from 'react'
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import {
  CustomButton,
  CustomInput
} from '../../components/common';
import { useAuth } from '../../hooks';
import { mainTheme, appFonts } from '../../constants';
import styles from './styles';

const UserDetailsScreen = ({ navigation }) => {
  const { editUser, removeAccount, authState } = useAuth();
  const [loadingEditUser, setLoadingEditUser] = useState(false);
  const [loadingRemoveAccount, setLoadingRemoveAccount] = useState(false);
  const [newUsername, setNewUsername] = useState(authState.user.username);
  const [newEmail, setNewEmail] = useState(authState.user.email);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const checkErrorsInForm = () => {
    let errors = [];
    if (!newUsername) {
      errors.push('Blank username');
    }
    if (!newEmail) {
      errors.push('Blank email');
    }
    if (!newPassword) {
      errors.push('Blank password');
    }

    let msg = '';
    if (errors.length) {
      msg = errors.join('\n');
    }
    return msg;
  }

  const handleSubmitEdit = async () => {
    const msg = checkErrorsInForm();
    if (msg) {
      setError(msg);
      return;
    }
    setLoadingEditUser(true);
    try {
      await editUser(
        newUsername,
        newEmail,
        newPassword
      )
      setLoadingEditUser(false);
    } catch (err) {
      const msg = err?.response?.data ||
        err?.message ||
        'An unexpected error happened requesting quotes list'
      setError(msg)
      setLoadingEditUser(false);
    }
  }

  const handleDeleteAccount = async () => {
    setLoadingRemoveAccount(true)
    try {
      await removeAccount();
    } catch (err) {
      const msg = err?.response?.data ||
        err?.message ||
        'An unexpected error happened requesting quotes list'
      setError(msg)
      setLoadingRemoveAccount(false);
    }
  }

  const getErrorMessage = (inputType) => {
    switch (inputType) {
      case 'username':
        if (!newUsername) {
          return 'Username must not be blank';
        }
        return '';
      case 'email': {
        if (!newEmail) {
          return 'Email must not be blank';
        }
        return '';
      }
      case 'password': {
        if (!newPassword) {
          return 'Password must not be blank'
        }
        return '';
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={(Platform.OS === 'ios') ? "padding" : null} enabled
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 60 })}
    >
      <ScrollView>
        <Text
          style={styles.title}
        >
          Your user data
        </Text>
        {
          !!error &&
          <View>
            <Text
              style={styles.errorTitle}
            >
              Erros
          </Text>

            <Text
              style={styles.error}
            >
              {error}
            </Text>
          </View>
        }
        <CustomInput
          level='primary'
          icon='user'
          label='Username'
          placeholder='Enter your username'
          value={newUsername}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => setNewUsername(text)}
          errorMessage={getErrorMessage('username')}
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
          value={newEmail}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => setNewEmail(text)}
          errorMessage={getErrorMessage('email')}
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
          value={newPassword}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(text) => setNewPassword(text)}
          errorMessage={getErrorMessage('password')}
          errorStyle={
            {
              color: mainTheme.danger,
              fontFamily: appFonts.regularItalic
            }
          }
        />
        <View style={{ height: 20 }} />
        <CustomButton
          loading={loadingEditUser}
          type='solid'
          title="Edit and update user info"
          level='primary'
          icon='user-edit'
          onPress={() => { handleSubmitEdit() }}
        />
        <View style={{ height: 30 }} />
        <CustomButton
          loading={loadingRemoveAccount}
          type='clear'
          title="Delete account"
          level='danger'
          icon={'exclamation-circle'}
          onPress={() => { handleDeleteAccount() }}
        />
        <View style={{ height: 50 }} />
      </ScrollView>
    </KeyboardAvoidingView >
  )
}

export default UserDetailsScreen
