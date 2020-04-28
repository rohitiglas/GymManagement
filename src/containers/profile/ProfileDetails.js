import Background from '../../components/Background';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {ScrollView, StyleSheet, Alert, AsyncStorage} from 'react-native';
import React, {Component, memo} from 'react';
import {theme} from '../../utils/theme';

import {nameValidator} from '../../core/utils';
import {db} from '../../core/config';

class ProfileDetails extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: '',
      oldPassword: '',
      newPassword: '',
      shopName: '',
      shopNameError: '',
      mobileNumber: '',
      mobileNumberError: '',
      shopAddress: '',
      shopAddressError: '',
      error: '',
      uid: '',
      token: '',
    };
  }
  componentDidMount(): void {
    AsyncStorage.getItem('uid')
      .then(uid => {
        db.ref('/customer/' + uid + '/customerDetails/').on(
          'value',
          querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            this.setState({
              uid,
              shopName: data.name,
              shopAddress: data.address,
              mobileNumber: data.mobileNumber,
            });
          },
        );
      })
      .catch(err => {
        this.setState({uid: ''});
      });

    AsyncStorage.getItem('fcmToken')
      .then(token => {
        console.log('KSKSKKSKSKKSKSKSKToken', token);
        this.setState({token});
      })
      .catch(err => {
        console.log('KSKSKKSKSKKSKSKSKTokenError', err);
        this.setState({token: ''});
      });
  }

  _onSignUpPressed = () => {
    const {shopName, shopAddress, mobileNumber, uid, token} = this.state;
    const shopNameError = nameValidator(shopName);
    const shopAddressError = nameValidator(shopAddress);
    const mobileNumberError = nameValidator(mobileNumber);
    if (shopNameError || shopAddressError || mobileNumberError) {
      this.setState({
        shopName,
        shopNameError,
        mobileNumber,
        mobileNumberError,
        shopAddress,
        shopAddressError,
      });
      return;
    }
    this.setState({loading: true});
    db.ref('/customer/' + uid + '/customerDetails/')
      .set({
        token,
        uid: uid,
        name: shopName,
        address: shopAddress,
        mobileNumber,
      })
      .then(data => {
        this.setState({loading: false});
        Alert.alert('', 'Profile add successfully');
        this.props.clickRow();
      })
      .catch(error => {
        this.setState({loading: false});
        Alert.alert('', 'Error for network request');
      });
  };
  render() {
    console.log('KSSKSKSKKSKKKSKSK', 'Called');
    const {
      shopName,
      shopNameError,
      shopAddress,
      shopAddressError,
      mobileNumber,
      mobileNumberError,
    } = this.state;
    return (
      <ScrollView>
        <Background>
          <TextInput
            label="Name"
            returnKeyType="next"
            error={!!shopNameError}
            errorText={shopNameError}
            value={shopName}
            onChangeText={text =>
              this.setState({shopName: text, shopNameError: ''})
            }
            autoCapitalize="none"
          />
          <TextInput
            label="Mobile Number"
            returnKeyType="next"
            error={!!mobileNumberError}
            errorText={mobileNumberError}
            value={mobileNumber}
            onChangeText={text =>
              this.setState({mobileNumber: text, mobileNumberError: ''})
            }
            autoCapitalize="none"
          />

          <TextInput
            label="Address"
            returnKeyType="done"
            error={!!shopAddressError}
            errorText={shopAddressError}
            value={shopAddress}
            onChangeText={text =>
              this.setState({shopAddress: text, shopAddressError: ''})
            }
            autoCapitalize="none"
          />

          <Button
            loading={this.state.loading}
            mode="contained"
            onPress={this._onSignUpPressed}
            style={styles.button}>
            Submit
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

export default ProfileDetails;
