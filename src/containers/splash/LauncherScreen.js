import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {getToken} from '../../utils/storage';
import {NavigationActions, StackActions} from 'react-navigation';

class LauncherScreen extends Component {
  async componentDidMount() {
    SplashScreen.hide();
    let data = await getToken();
    const {navigation} = this.props;

    if (data && data.length > 0) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Home'})],
      });
      navigation.dispatch(resetAction);
    } else {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'LoginComponent'})],
      });
      navigation.dispatch(resetAction);
    }
  }
  render() {
    return <View />;
  }
}

export default LauncherScreen;
