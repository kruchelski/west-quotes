import { StyleSheet } from 'react-native'
import { mainTheme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: mainTheme.bgColor0,
    padding: 20,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40
  },
  text: {
    fontFamily: 'PTSans_400Regular',
    textAlign: 'center',
    fontSize: 14,
    color: mainTheme.fgColor1,
  },
  usernameText: {
    fontFamily: 'PTSans_700Bold',
    fontSize: 16,
    textAlign: 'center',
    color: mainTheme.fgColor0,
    marginBottom: 10
  },
  buttonContainer: {
    padding: 30,
  }
})

export default styles;