import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: -25,
    marginBottom: -30,
    zIndex: 100,
    opacity: 0.9
  },
  textContainer: {
    marginTop: -25,
    marginRight: 'auto',
    marginLeft: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: mainTheme.secondary,
    borderRadius: 20
  },
  text: {
    fontFamily: appFonts.regular,
    color: mainTheme.colorLight,
  }
});

export default styles;