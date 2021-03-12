import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

const styles = StyleSheet.create({
	container: {
		backgroundColor: mainTheme.bgColor0,
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		padding: 0,
	},
  loadingContainer: {
		flex: 1,
		backgroundColor: mainTheme.bgColor0,
		alignItems: 'center',
		justifyContent: 'center',
	},
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
  },
  infoContainer: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  imageContainer: {
    minWidth: 200,
		minHeight: 200,
    maxHeight: 500,
    borderRadius: 6,
    backgroundColor: mainTheme.colorDark
  },
	image: {
		minWidth: 200,
		minHeight: 200,
    maxHeight: 500,
    shadowColor: '#141414',
    shadowOpacity: 1,
    shadowOffset: {width:0, height: 5},
    borderRadius: 6,
	}
});

export default styles;