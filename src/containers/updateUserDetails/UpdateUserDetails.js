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
import {updateUserDetails} from '../../actions/loginActions';
import {getGroceryToken, saveToken} from '../../utils/storage';
import {NavigationActions, StackActions} from 'react-navigation';
import {RadioButton, Text} from 'react-native-paper';

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      address: '',
      error: '',
      checked: 'Customer',
    };
  }

  onSuccess = data => {
    this.setState({loading: false});
    if (!data.error) {
      const {navigation} = this.props;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Home'})],
      });
      navigation.dispatch(resetAction);
    }
  };

  onError = error => {
    this.setState({loading: false});
    Alert.alert('', 'Error');
  };
  _onSignUpPressed = () => {
    this.setState({loading: true});

    this.props.actions.updateUserDetails(
      {fullName: this.state.name, address: this.state.address},
      this.onSuccess,
      this.onError,
    );
  };
  render() {
    return (
      <ScrollView>
        <Background>
          <Header>Update Details</Header>

          <TextInput
            label="User Name"
            returnKeyType="next"
            value={this.state.name}
            onChangeText={text => this.setState({name: text, error: ''})}
            autoCapitalize="none"
            keyboardType="default"
          />

          <TextInput
            label="House Number"
            returnKeyType="done"
            multiline
            value={this.state.address}
            onChangeText={text => this.setState({address: text, error: ''})}
            autoCapitalize="none"
            keyboardType="default"
          />

          <Button
            color="#00BCD4"
            loading={this.state.loading}
            mode="contained"
            onPress={this._onSignUpPressed}
            style={styles.button}>
            Update
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
      updateUserDetails: bindActionCreators(updateUserDetails, dispatch),
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(LoginComponent));
