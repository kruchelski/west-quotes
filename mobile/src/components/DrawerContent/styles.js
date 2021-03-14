import { StyleSheet } from 'react-native';
import { appFonts, mainTheme } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: mainTheme.bgColor1,
    padding: 0,
  },

  infoContainer: {
    flex: 1,
    alignItems: 'stretch',
  },

  infoContainerHeader: {
    padding: 20,
    paddingTop: 60,
    marginBottom: 20,
    backgroundColor: mainTheme.primaryLight,
  },

  text: {
    fontFamily: appFonts.regular,
    textAlign: 'center',
    fontSize: 14,
    color: mainTheme.colorLight,
  },

  usernameText: {
    fontFamily: appFonts.bold,
    fontSize: 18,
    textAlign: 'center',
    color: mainTheme.colorLight,
    marginBottom: 10,
  },

  buttonContainer: {
    padding: 30,
  },
});
