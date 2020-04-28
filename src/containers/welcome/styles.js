import {StyleSheet} from 'react-native';
import {theme} from '../../utils/theme';

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    width: '45%',
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
export default styles;
