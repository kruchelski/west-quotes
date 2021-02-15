import { StyleSheet } from 'react-native';
import { mainTheme } from '../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: mainTheme.bgColor0,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
		paddingVertical: 50
	},
	logoImage: {
		width: 300,
		height: 150,
		resizeMode: 'contain',
	},
	text: {
		color: mainTheme.fgColor0,
		fontSize: 16,
		textAlign: 'center'
	}
});

export default styles;