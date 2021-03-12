import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: mainTheme.secondaryLight,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    marginHorizontal: 0,
    borderRadius: 6
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 5,
    marginVertical: 3,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    marginRight: 0,
    flex: 3,
  },
  textKey: {
    fontFamily: appFonts.bold,
    fontSize: 16,
    color: mainTheme.colorLight,
    fontWeight: 'bold',
    flex: 10,
  },
  textValue: {
    fontFamily: appFonts.regular,
    fontSize: 16,
    color: mainTheme.colorLight,
    flex: 10,
  }
});

export default styles;