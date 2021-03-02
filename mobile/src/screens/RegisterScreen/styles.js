import { StyleSheet } from 'react-native'
import { mainTheme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: mainTheme.bgColor0,
    paddingTop: 30
  },
  logoImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    marginTop: 0,
  },
  logoImage: {
		width: 200,
		height: 100,
		resizeMode: 'cover',
    margin: 0
	},
})

export default styles;