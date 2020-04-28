import Background from '../../components/Background';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {ScrollView, Alert, Text} from 'react-native';
import React, {Component, memo} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import {NavigationActions, StackActions} from 'react-navigation';
import Loader from '../../components/Loader';
import styles from './styles';
import {clearGroceryToken} from '../../utils/storage';

class CustomerLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      mobile: '',
      error: '',
    };
  }
  async componentDidMount(): void {
    await clearGroceryToken();
  }

  onSuccess = data => {
    if (!data.error) {
      this.setState({loading: false});
      const {navigation} = this.props;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'OtpComponent',
            params: {mobile: this.state.mobile},
          }),
        ],
      });
      navigation.dispatch(resetAction);
    }
  };

  onError = error => {
    this.setState({loading: false});
    Alert.alert('', 'Error');
  };
  _onSignUpPressed = () => {
    if (this.state.mobile && this.state.mobile.length === 10) {
      this.setState({loading: true, error: ''});
      this.props.actions.login.login(
        {mobile: this.state.mobile},
        this.onSuccess,
        this.onError,
      );
    } else {
      this.setState({error: 'Please enter 10 digit mobile number'});
    }
  };
  render() {
    return (
      <ScrollView>
        <Background>
          <Header>Customer Login</Header>
          <Loader loading={this.state.loading} />
          <TextInput
            error={this.state.error !== ''}
            label="Mobile Number"
            returnKeyType="next"
            maxLength={10}
            value={this.state.mobile}
            onChangeText={text => this.setState({mobile: text, error: ''})}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
          {this.state.error !== '' && <Text>{this.state.error}</Text>}
          <Button
            color="#00BCD4"
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
)(memo(CustomerLoginComponent));
