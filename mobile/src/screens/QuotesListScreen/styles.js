import { StyleSheet } from 'react-native';
import { appFonts, mainTheme } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: mainTheme.bgColor1
  },
  title: {
    fontFamily: appFonts.bold,
    fontWeight: 'bold',
    fontSize: 16,
    color: mainTheme.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
  error: {
    fontFamily: appFonts.regular,
    fontSize: 14,
    color: mainTheme.danger,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: mainTheme.danger,
    borderRadius: 6
  }
});
