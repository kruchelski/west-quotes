import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: mainTheme.bgColor0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingMessage: {
    color: `${mainTheme.primary}cc`,
    fontFamily: appFonts.regular,
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
