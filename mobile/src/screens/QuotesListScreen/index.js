import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const QuotesListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>
        😎 Hello, QuotesListScreen!
      </Text>
    </View>
  )
}

export default QuotesListScreen
