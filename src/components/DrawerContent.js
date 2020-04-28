import React, {Component} from 'react';
import {NavigationActions, StackActions} from 'react-navigation';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {setSelectedDrawerRow} from '../actions/loginActions';
import firebase from 'firebase/app';

class DrawerContent extends Component {
  logoutPress = async () => {
    const {navigation} = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'LoginComponent'})],
    });
    navigation.dispatch(resetAction);
    this.props.drawerSelectedRow('');
    await firebase.auth().signOut();
  };

  rowPress = item => {
    this.props.navigation.closeDrawer();
    console.log('KSKSKKKSKSKKSKSRow', item);
    this.props.drawerSelectedRow(item);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../images/header.jpg')}
            style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.headerText}>
              {this.props.userInfo
                ? this.props.userInfo.firstName
                : 'Rohit Bansal'}
            </Text>
          </ImageBackground>
        </View>
        <TouchableOpacity
          style={styles.screenContainer}
          onPress={() => this.rowPress('MyProfile')}>
          <View style={styles.activeBackgroundColor}>
            <Image
              source={require('../images/home.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={styles.selectedTextStyle}>My Profile</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              width: '100%',
              height: 1,
              backgroundColor: '#d3d3d3',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.screenContainer}
          onPress={() => this.rowPress('Home')}>
          <View style={styles.activeBackgroundColor}>
            <Image
              source={require('../images/home.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={styles.selectedTextStyle}>Home</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              width: '100%',
              height: 1,
              backgroundColor: '#d3d3d3',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.screenContainer}
          onPress={() => this.rowPress('MyOrder')}>
          <View style={styles.activeBackgroundColor}>
            <Image
              source={require('../images/home.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={styles.selectedTextStyle}>My Order</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              width: '100%',
              height: 1,
              backgroundColor: '#d3d3d3',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.screenContainer}
          onPress={this.logoutPress}>
          <View>
            <View style={styles.activeBackgroundColor}>
              <Image
                source={require('../images/logout.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={styles.selectedTextStyle}>Logout</Text>
            </View>
            <View
              style={{
                marginTop: 5,
                width: '100%',
                height: 1,
                backgroundColor: '#d3d3d3',
              }}
            />
          </View>
        </TouchableOpacity>

        <View>
          <View style={styles.activeBackgroundColor}>
            <Text style={styles.versionTextStyle}>App Version : 1</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: 150,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#fff8f8',
  },
  screenContainer: {
    paddingTop: 20,
    width: '100%',
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: 'center',
  },
  selectedTextStyle: {
    margin: 10,
    color: '#0a0a0a',
  },
  versionTextStyle: {
    marginTop: 20,
    color: '#0a0a0a',
  },
  activeBackgroundColor: {
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const mapStateToProps = state => {
  return {
    selectedRow: state.login.selectedDrawerRow,
    userInfo: state.login.userInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    drawerSelectedRow: item => {
      dispatch(setSelectedDrawerRow(item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent);
