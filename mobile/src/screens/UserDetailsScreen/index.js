import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { CustomButton, CustomInput } from '../../components/common';
import { useAuth } from '../../hooks';
import { mainTheme, appFonts } from '../../constants';
import styles from './styles';

const UserDetailsScreen = () => {
  const { editUser, removeAccount, authState } = useAuth();
  const [loadingEditUser, setLoadingEditUser] = useState(false);
  const [loadingRemoveAccount, setLoadingRemoveAccount] = useState(false);
  const [newUsername, setNewUsername] = useState(authState.user.username);
  const [newEmail, setNewEmail] = useState(authState.user.email);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [updateDataTry, setUpdateDataTry] = useState(false);

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
				if (!inputValue || !inputValue.length >= 4) {
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

  const handleSubmitEdit = async () => {
    setUpdateDataTry(true);
    setError(null);
    const error = validator({
      username: newUsername,
      email: newEmail,
      password: newPassword
    })
    if (error) {
      setError(error);
      return;
    }
    setLoadingEditUser(true);
    try {
      await editUser(
        newUsername,
        newEmail,
        newPassword,
      );
      setLoadingEditUser(false);
      setUpdateDataTry(false);
    } catch (err) {
      const msg = err?.response?.data
        || err?.message
        || 'An unexpected error happened requesting quotes list';
      setError(msg);
      setLoadingEditUser(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoadingRemoveAccount(true);
    try {
      await removeAccount();
    } catch (err) {
      const msg = err?.response?.data
        || err?.message
        || 'An unexpected error happened requesting quotes list';
      setError(msg);
      setLoadingRemoveAccount(false);
    }
  };

  const getErrorMsg = (inputType) => {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let errors = [];
    if (!updateDataTry) {
      return '';
    }
    switch(inputType) {
      case 'username': 
        if (!newUsername) {
          errors.push('Username must not be blank');
        }
        break;
      case 'email':
        if (!newEmail) {
          errors.push('Email must not be blank');
        };
        if (!newEmail.match(emailRegex)) {
          errors.push('Email is invalid');
        }
        break;
      case 'password': {
        if (!newPassword) {
          errors.push('Password must not be blank');
        };
        if (newPassword.length < 4) {
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 60 })}
    >
      <ScrollView>
        <Text style={styles.title}>
          Your user data
        </Text>

        <If condition={error}>
          <View>
            <Text style={styles.errorTitle}>
              Erros
            </Text>
            <Text style={styles.error}>
              {error}
            </Text>
          </View>
        </If>

        <CustomInput
          level='primary'
          icon='user'
          label='Username'
          placeholder='Enter your username'
          value={newUsername}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => setNewUsername(text)}
          errorMessage={getErrorMsg('username')}
          errorStyle={{
            color: mainTheme.danger,
            fontFamily: appFonts.regularItalic,
          }}
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
          errorMessage={getErrorMsg('email')}
          errorStyle={{
            color: mainTheme.danger,
            fontFamily: appFonts.regularItalic,
          }}
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
          errorMessage={getErrorMsg('password')}
          errorStyle={{
            color: mainTheme.danger,
            fontFamily: appFonts.regularItalic,
          }}
        />

        <View style={{ height: 20 }} />
        <CustomButton
          loading={loadingEditUser}
          type='solid'
          title="Edit and update user info"
          level='primary'
          icon='user-edit'
          onPress={() => { handleSubmitEdit(); }}
        />

        <View style={{ height: 30 }} />
        <CustomButton
          loading={loadingRemoveAccount}
          type='clear'
          title="Delete account"
          level='danger'
          icon={'exclamation-circle'}
          onPress={() => { handleDeleteAccount(); }}
        />

        <View style={{ height: 50 }} />
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

export default UserDetailsScreen;
