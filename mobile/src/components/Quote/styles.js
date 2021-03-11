import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

const styles = StyleSheet.create({
  preQuoteText: {
    fontFamily: appFonts.regularItalic,
    fontSize: 12,
    textAlign: 'left',
    color: mainTheme.fgColor2,
    marginTop: 5,
    marginBottom: 10,
  },
  quoteText: {
    fontFamily: appFonts.regular,
    fontSize: 22,
    textAlign: 'center',
    color: mainTheme.primaryDark,
    marginTop: 0,
    marginBottom: 20,
  }
});

export default styles;