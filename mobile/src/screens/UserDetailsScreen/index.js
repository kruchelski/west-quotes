import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const UserDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>
        😎 Hello, UserDetailsScreen!
      </Text>
    </View>
  )
}

export default UserDetailsScreen
