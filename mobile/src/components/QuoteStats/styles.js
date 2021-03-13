import { StyleSheet } from 'react-native';
import { mainTheme, appFonts } from '../../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: mainTheme.primaryLight,
    marginTop: 10,
    marginBottom: 20,
    padding: 8,
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
    marginRight: 10,
    flex: 1,
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
    flex: 4,
  }
});

export default styles;