import { StyleSheet } from 'react-native';
import { mainTheme } from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: mainTheme.bgColor0,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 0,
  },

  infoContainer: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
});
