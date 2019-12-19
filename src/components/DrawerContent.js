import React, {Component} from 'react';
import {NavigationActions, StackActions} from 'react-navigation';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {saveToken} from 'utils/storage';

import {connect} from 'react-redux';

import {setSelectedDrawerRow} from '../actions/loginActions';
import Home from '../containers/dashboard/Home';
import {data} from '../utils/drawerContent';

class DrawerContent extends Component {
  logoutPress = async () => {
    saveToken('').then(isSuccess => {
      if (isSuccess) {
        const {navigation} = this.props;
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'LoginComponent'})],
        });
        navigation.dispatch(resetAction);
        this.props.drawerSelectedRow('Home');
      }
    });
  };

  rowPress = async item => {
    if (item === 'Logout') {
      this.logoutPress();
    } else {
      this.props.navigation.closeDrawer();
      this.props.drawerSelectedRow(item);
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          marginTop: 5,
          width: '100%',
          height: 1,
          backgroundColor: '#d3d3d3',
        }}
      />
    );
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
                ? this.props.userInfo.email
                : 'abc@gmail.com'}
            </Text>
          </ImageBackground>
        </View>

        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.screenContainer}
              onPress={() => this.rowPress(item.name)}>
              <View style={styles.activeBackgroundColor}>
                <Image source={item.image} style={{width: 30, height: 30}} />
                <Text style={styles.selectedTextStyle}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
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
