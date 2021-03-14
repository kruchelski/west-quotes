import { mainTheme, appFonts } from '../../../constants';

export default {
  solid: {
    primary: {
      backgroundColor: mainTheme.primary,
      color: mainTheme.colorLight,
      fontFamily: appFonts.regular,
      fontSize: 16,
      marginHorizontal: 10,
    },

    secondary: {
      backgroundColor: mainTheme.danger,
      color: mainTheme.colorLight,
      fontFamily: appFonts.regular,
      fontSize: 16,
      marginHorizontal: 10,
    },
  },

  outline: {
    primary: {
      borderColor: mainTheme.primary,
      color: mainTheme.primary,
      fontFamily: appFonts.regular,
      fontSize: 16,
      marginHorizontal: 10,
    },

    secondary: {
      borderColor: mainTheme.secondary,
      color: mainTheme.secondary,
      fontFamily: appFonts.regular,
      fontSize: 16,
      marginHorizontal: 10,
    },

    danger: {
      borderColor: mainTheme.danger,
      color: mainTheme.danger,
      fontFamily: appFonts.regular,
      fontSize: 16,
      marginHorizontal: 10,
    },
  },

  clear: {
    primary: {
      color: mainTheme.primary,
      fontFamily: appFonts.regular,
      fontSize: 16,
      marginHorizontal: 10,
    },

    secondary: {
      color: mainTheme.secondary,
      fontFamily: appFonts.regular,
      fontSize: 16,
      marginHorizontal: 10,
    },

    danger: {
      color: mainTheme.danger,
      fontFamily: appFonts.regular,
      fontSize: 16,
      marginHorizontal: 10,
    },
  },

  icon: {
    solid: {
      primary: mainTheme.colorLight,
      secondary: mainTheme.colorLight,
      danger: mainTheme.danger,
    },

    outline: {
      primary: mainTheme.primary,
      secondary: mainTheme.secondary,
      danger: mainTheme.danger,
    },

    clear: {
      primary: mainTheme.colorLight,
      secondary: mainTheme.colorLight,
      danger: mainTheme.danger,
    },
  },
};
