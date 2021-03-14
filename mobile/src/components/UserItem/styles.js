import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 3,
    padding: 10,
    paddingHorizontal: 10,
  },

  icon: {
    marginRight: 10,
  },

  iconLike: {
    marginRight: 5,
  },

  usernameText: {
    fontFamily: appFonts.bold,
    fontSize: 16,
    color: mainTheme.fgColor0,
    fontWeight: 'bold',
    flex: 1,
  },

  iconText: {
    fontFamily: appFonts.regular,
    fontSize: 16,
    color: mainTheme.secondaryLight,
  },
});
