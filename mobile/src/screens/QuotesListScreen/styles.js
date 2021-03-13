import { StyleSheet } from 'react-native';
import { appFonts, mainTheme } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  hello: {
    fontFamily: appFonts.bold,
    fontSize: 16,
  },
});
