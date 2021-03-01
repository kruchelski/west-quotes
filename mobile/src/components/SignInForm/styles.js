import { StyleSheet } from 'react-native'
import { mainTheme } from '../../constants';

const styles = StyleSheet.create({
  formContainer: {
    margin: 15,
    marginTop: 10,
    padding: 15,
    backgroundColor: `${mainTheme.bgColor2}`,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    color: mainTheme.primaryLight,
    marginTop: 20,
    marginBottom: 0,
    textAlign: 'center'
  },
  error: {
    fontFamily: 'PTSans_400Regular',
    color: mainTheme.danger,
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: mainTheme.danger,
    padding: 5,
    marginHorizontal: 5,
    marginBottom: 5
  }
})

export default styles;