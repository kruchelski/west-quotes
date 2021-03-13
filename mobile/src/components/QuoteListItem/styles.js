import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: mainTheme.primary,
    borderRadius: 6,
    backgroundColor: mainTheme.bgColor0,
    shadowColor: '#44444455',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 1}
  },
  iconLike: {
    marginRight: 5,
  },
  quoteText: {
    fontFamily: appFonts.regular,
    fontSize: 14,
    color: mainTheme.fgColor0,
    flex: 20
  },
  iconText: {
    fontFamily: appFonts.regular,
    fontSize: 14,
    color: mainTheme.secondaryLight,
    marginLeft: 5,
    flex: 1
  }
});

export default styles;