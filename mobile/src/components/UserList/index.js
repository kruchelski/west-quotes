import React from 'react';
import { View, Text } from 'react-native';
import UserItem from '../UserItem';
import styles from './styles';

const UserList = ({ likers, newQuote }) => {

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        Others that liked this quote:
      </Text>
      <Choose>
        <When condition={newQuote}>
          <View
            style={styles.textContainer}
          >


            <Text
              style={styles.newQuote}
            >
              This is a brand new quote! You are the first one to see it.
            </Text>
          </View>
        </When>
        <When condition={!newQuote && (!likers || !likers.length)}>
          <Text
            style={styles.error}
          >
            No one else liked this quote :(
            </Text>
        </When>
        <Otherwise>
          {
            likers.map((liker, index) => {
              return <UserItem
                key={index}
                username={liker.username}
                likes={liker.UserQuotes[0].likes}
              />
            })
          }
        </Otherwise>
      </Choose>
    </View>
  );
}

export default UserList;