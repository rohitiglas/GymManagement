import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {getGroceryToken} from '../../utils/storage';
import {NavigationActions, StackActions} from 'react-navigation';
import firebase from 'firebase/app';
import {db} from '../../core/config';
import Loader from '../../components/Loader';

class LauncherScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;

    setTimeout(() => {
      SplashScreen.hide();
      firebase.auth().onAuthStateChanged(user => {
        console.log('KKSKSKKSSKKSKS', user);
        this.setState({isLoading: false});
        if (user) {
          // User is logged in
          AsyncStorage.setItem('uid', user.uid);
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Home'})],
          });
          navigation.dispatch(resetAction);
          // navigation.navigate('Home');
        } else {
          // User is not logged in
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'LoginComponent'})],
          });
          navigation.dispatch(resetAction);
          navigation.navigate('LoginComponent');
        }
      });
    }, 5000);

    // if (data && data.length > 0) {
    //   const resetAction = StackActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({routeName: 'Home'})],
    //   });
    //   navigation.dispatch(resetAction);
    // } else {
    //   const resetAction = StackActions.reset({
    //     index: 0,
    //     actions: [
    //       NavigationActions.navigate({routeName: 'CustomerLoginComponent'}),
    //     ],
    //   });
    //   navigation.dispatch(resetAction);
    // }
  }
  render() {
    return (
      <View>
        <Loader loading={this.state.isLoading} />
      </View>
    );
  }
}

export default LauncherScreen;
