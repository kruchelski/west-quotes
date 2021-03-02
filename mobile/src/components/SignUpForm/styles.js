import { StyleSheet } from 'react-native'
import { appFonts, mainTheme } from '../../constants';

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 15,
    paddingTop: 10,
    paddingHorizontal: 5,
    backgroundColor: `${mainTheme.bgColor2}`,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  text: {
    color: mainTheme.primaryLight,
    marginTop: 15,
    marginBottom: 0,
    textAlign: 'center'
  },
  error: {
    fontFamily: appFonts.regular,
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