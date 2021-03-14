import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: -25,
    marginBottom: -30,
    zIndex: 100,
    opacity: 0.9,
  },

  textContainer: {
    marginTop: -25,
    marginLeft: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: mainTheme.primaryLight,
    borderRadius: 20,
  },

  text: {
    fontFamily: appFonts.regular,
    color: mainTheme.colorLight,
  },
});
