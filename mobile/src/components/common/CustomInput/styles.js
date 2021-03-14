import { mainTheme, appFonts } from '../../../constants';

export default {
  input: {
    color: mainTheme.fgColor0,
    fontSize: 14,
    fontFamily: appFonts.regular,
    marginVertical: 0,
    padding: 0,
  },

  label: {
    primary: {
      color: mainTheme.primary,
      marginBottom: 0,
      fontSize: 14,
      fontFamily: appFonts.regular,
    },

    secondary: {
      color: mainTheme.secondary,
      marginBottom: 0,
      fontSize: 14,
      fontFamily: appFonts.regular,
    },
  },

  container: {
    primary: {
      borderBottomColor: mainTheme.primary,
      margin: 0,
      padding: 0,
      marginBottom: 0,
    },

    secondary: {
      borderBottomColor: mainTheme.secondary,
      margin: 0,
      padding: 0,
      marginBottom: 0,
    },
  },

  icon: {
    primary: mainTheme.primary,
    secondary: mainTheme.secondary,
  },
};
