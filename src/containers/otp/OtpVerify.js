import Background from '../../components/Background';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {ScrollView, Text} from 'react-native';
import React, {Component, memo} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {otpVerify} from '../../actions/loginActions';
import {getGroceryToken, saveGroceryToken} from '../../utils/storage';
import {NavigationActions, StackActions} from 'react-navigation';
import styles from './styles';
import Loader from '../../components/Loader';

class OtpVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      otp: '',
      error: '',
      mobile: this.props.navigation.state.params.mobile,
    };
  }

  onSuccess = data => {
    this.setState({loading: false});
    if (data && data.data) {
      if (data.data.token && data.data.token.length > 0) {
        saveGroceryToken(data.data.token).then(isSuccess => {
          console.log('Updated Token =====', data.data.token);
          if (isSuccess) {
            const {navigation} = this.props;
            let resetAction = null;
            if (data.data.isRecordNew) {
              resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'UpdateUserDetailsComponent',
                  }),
                ],
              });
            } else {
              resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Home'})],
              });
            }

            navigation.dispatch(resetAction);
          }
        });
      }
    }
  };

  onError = error => {
    this.setState({loading: false});
  };
  _onSignUpPressed = () => {
    if (this.state.otp.length > 3) {
      this.setState({loading: true, error: ''});
      this.props.actions.otpVerify(
        {mobile: this.state.mobile, otp: this.state.otp},
        this.onSuccess,
        this.onError,
      );
    } else {
      this.setState({error: 'Please enter OTP correctly'});
    }
  };
  render() {
    return (
      <ScrollView>
        <Background>
          <Header>Verify OTP</Header>
          <Loader loading={this.state.loading} />

          <TextInput
            error={this.state.error !== ''}
            label="Enter OTP"
            returnKeyType="next"
            value={this.state.otp}
            onChangeText={text => this.setState({otp: text, error: ''})}
            autoCapitalize="none"
            autoCompleteType="tel"
            textContentType="emailAddress"
            keyboardType="numeric"
          />
          {this.state.error !== '' && <Text>{this.state.error}</Text>}

          <Button
            color="#00BCD4"
            mode="contained"
            onPress={this._onSignUpPressed}
            style={styles.button}>
            Verify
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
      otpVerify: bindActionCreators(otpVerify, dispatch),
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(OtpVerify));
