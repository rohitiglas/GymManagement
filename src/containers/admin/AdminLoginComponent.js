import Background from '../../components/Background';
import {View} from 'react-native';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import {ScrollView, StyleSheet, Alert} from 'react-native';
import React, {Component, memo} from 'react';
import {theme} from '../../utils/theme';

import {connect} from 'react-redux';
import {emailValidator, passwordValidator} from '../../utils/utils';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import {saveToken} from '../../utils/storage';
import {NavigationActions, StackActions} from 'react-navigation';
import {RadioButton, Text} from 'react-native-paper';

class AdminLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: '',
      name: '',
      password: '',
      mobile: '',
      address: '',
      error: '',
      checked: 'Customer',
    };
  }

  onSuccess = data => {
    this.setState({loading: false});
    if (data.data) {
      if (data.data.token && data.data.token.length > 0) {
        saveToken(data.data.token).then(isSuccess => {
          if (isSuccess) {
            const {navigation} = this.props;
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Home'})],
            });
            navigation.dispatch(resetAction);
          }
        });
      }
    }
  };

  onError = error => {
    this.setState({loading: false});
    Alert.alert('', 'Error');
  };
  _onSignUpPressed = () => {
    // this.setState({loading: true});

    // this.props.actions.login.login(
    //   {email: this.state.email, password: this.state.password},
    //   this.onSuccess,
    //   this.onError,
    // );
    const {navigation} = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'OtpComponent'})],
    });
    navigation.dispatch(resetAction);
  };
  render() {
    const {checked} = this.state;
    return (
      <ScrollView>
        <Background>
          <Header>Admin Login</Header>

          <TextInput
            label="Mobile Number"
            returnKeyType="next"
            maxLength={10}
            value={this.state.mobile}
            onChangeText={text => this.setState({mobile: text, error: ''})}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />

          <TextInput
            label="Password"
            returnKeyType="done"
            value={this.state.password}
            onChangeText={text => this.setState({password: text, error: ''})}
            secureTextEntry
            autoCapitalize="none"
          />

          <Button
            color="#FF5722"
            loading={this.state.loading}
            mode="contained"
            onPress={this._onSignUpPressed}
            style={styles.button}>
            Login
          </Button>
        </Background>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
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

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      login: bindActionCreators(loginActions, dispatch),
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(AdminLoginComponent));
