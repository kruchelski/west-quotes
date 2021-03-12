import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: `${mainTheme.primaryLight}77`,
    borderRadius: 4
  },
  bar: {
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: `${mainTheme.primaryLight}77`,
    borderRadius: 2
  },
  icon: {
    position: 'absolute',
    zIndex: 100,
    left: -25,
  },
  text: {
    fontFamily: appFonts.bold,
    color: mainTheme.primaryDark,
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: 16
  }
});

export default styles;