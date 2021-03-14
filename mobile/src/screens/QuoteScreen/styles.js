import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

const styles = StyleSheet.create({
	container: {
		backgroundColor: mainTheme.bgColor0,
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		padding: 0,
	},
  infoContainer: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
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

export default styles;