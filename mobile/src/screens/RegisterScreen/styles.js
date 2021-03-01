import { StyleSheet } from 'react-native'
import { mainTheme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: mainTheme.bgColor0,
  },
  logoImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  logoImage: {
		width: 200,
		height: 100,
		resizeMode: 'cover',
    margin: 15,
    marginBottom: 0,
    marginTop: 0
	},
})

export default styles;