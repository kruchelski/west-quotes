import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

export default StyleSheet.create({
  preQuoteText: {
    fontFamily: appFonts.regularItalic,
    fontSize: 12,
    textAlign: 'left',
    color: mainTheme.fgColor2,
    marginTop: 5,
    marginBottom: 10,
  },
});
