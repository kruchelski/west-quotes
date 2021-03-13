import React from 'react';
import { View, Text } from 'react-native';
import { CustomButton } from '../common';
import { useAuth } from '../../hooks';
import styles from './styles';

const DrawerContent = ({ navigation }) => {
  const { authState, signOut, authErrorHandler } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      authErrorHandler(error, 'An unexpected error happened trying to Sign Out');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerHeader}>
          <Text style={styles.usernameText}>
            {`@${authState.user.username}`}
          </Text>

          <Text style={styles.text}>
            {authState.user.email}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            type='outline'
            title="Go to My Stuff"
            level='primary'
            icon='compact-disc'
            onPress={() => navigation.navigate('UserStuffScreen')}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          type='outline'
          title="Logout"
          level='secondary'
          icon='sign-out-alt'
          onPress={() => handleLogout()}
        />
      </View>

      {authState.error && (
        <Text>An error occurred: ${authState.error}</Text>
      )}
    </View>
  );
};

export default DrawerContent;
