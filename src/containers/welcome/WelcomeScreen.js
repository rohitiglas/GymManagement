import Background from '../../components/Background';
import Header from '../../components/Header';
import {View} from 'react-native';
import Button from '../../components/Button';
import React, {Component, memo} from 'react';
import styles from './styles';

class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: '',
      password: '',
      error: '',
    };
  }
  _onAdminPressed = () => {
    const {navigation} = this.props;
    navigation.navigate({routeName: 'AdminLoginComponent'});
  };
  _onCustomerPressed = () => {
    const {navigation} = this.props;
    navigation.navigate({routeName: 'CustomerLoginComponent'});
  };
  render() {
    return (
      <Background>
        <Header>Please Select User Type</Header>

        <View style={styles.mainView}>
          <Button
            color="#00BCD4"
            loading={this.state.loading}
            mode="contained"
            onPress={this._onAdminPressed}
            style={styles.button}>
            Admin
          </Button>
          <Button
            color="#00BCD4"
            loading={this.state.loading}
            mode="contained"
            onPress={this._onCustomerPressed}
            style={styles.button}>
            Customer
          </Button>
        </View>
      </Background>
    );
  }
}

export default WelcomeScreen;
