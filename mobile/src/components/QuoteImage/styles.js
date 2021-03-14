import { StyleSheet } from 'react-native';
import { mainTheme } from '../../constants';

export default StyleSheet.create({
  imageContainer: {
    minWidth: 200,
    minHeight: 200,
    maxHeight: 500,
    borderRadius: 6,
    backgroundColor: mainTheme.colorDark,
  },

  image: {
    minWidth: 200,
    minHeight: 200,
    maxHeight: 500,
    shadowColor: '#141414',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 5 },
    borderRadius: 6,
    resizeMode: 'cover',
  },
});
