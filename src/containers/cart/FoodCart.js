import React, {Component} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import Card from '../../utils/Card';
import styles from '../styles';
import {fetchAllMealData} from '../../actions/loginActions';
import MealList from '../MealDataList';
import CartList from './FoodCartList';
import Button from '../../components/Button';
import {NavigationActions, StackActions} from 'react-navigation';
import {db} from '../../core/config';
import axios from 'axios';
import SplashScreen from "react-native-splash-screen";
import firebase from 'firebase';
let totalPrice = 0;

class FoodCart extends Component {
  constructor() {
    super();
    this.state = {
      refreshLoader: false,
      token: '',
      isLoading: true,
      attendance: {},
      userInfo: {},
      productData: [],
      orderCount: 0,
      orderData: [],
      uid: '',
      isAttendanceMark: false,
      customerName: '',
      customerAddress: '',
      customerMobile: '',
      shopName: '',
      shopAddress: '',
      shopMobile: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('uid')
      .then(uid => {
        console.log('KSKSKKSKSKSKUISSSS', uid);
        db.ref('/customer/' + uid + '/customerDetails/').on(
          'value',
          querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            this.setState({
              uid: uid,
              customerName: data.name,
              customerAddress: data.address,
              customerMobile: data.mobileNumber,
            });
            this.checkShopDetails();
          },
        );
      })
      .catch(err => {
        console.log('KSKSKKSKSKSKERRIRRORORO', err);
        this.setState({uid: ''});
      });
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        console.log('KKSKSKKSSKKSKSUIDTOKEN', user);
      });
    }, 5000);
    this.checkOrderCount();
  }
  checkShopDetails = uid => {
    db.ref('/shops/p58QMHdQmxUTHkB8eDD1EeDaMTj1/shopDetails/').on(
      'value',
      querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        this.setState({
          uid,
          token: data.token,
          shopName: data.shopName,
          shopAddress: data.shopAddress,
          shopMobile: data.mobileNumber,
        });
      },
    );
  };
  checkOrderCount = () => {
    AsyncStorage.getItem('uid')
      .then(uid => {
        db.ref('/customer/' + uid + '/cart/').on('value', querySnapShot => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          let todosKeys = Object.keys({...data});
          this.setState({
            uid,
            orderData: {...data},
            orderCount: todosKeys.length,
            isLoading: false,
          });
        });
      })
      .catch(() => {
        this.setState({uid: ''});
      });
  };
  backPress = () => {
    this.props.navigation.pop();
  };
  continueOrder = () => {
    const {
      customerName,
      customerAddress,
      customerMobile,
      shopName,
      shopAddress,
      shopMobile,
    } = this.state;
    let orderKeys = Object.keys(this.state.orderData);
    const mainOrderObject = {};
    mainOrderObject.totalPrice = totalPrice;
    mainOrderObject.customerName = customerName;
    mainOrderObject.customerAddress = customerAddress;
    mainOrderObject.customerMobile = customerMobile;
    mainOrderObject.shopName = shopName;
    mainOrderObject.shopAddress = shopAddress;
    mainOrderObject.shopMobile = shopMobile;
    // mainOrderObject.push({totalPrice});
    let orderData = [];
    orderKeys.map(item => {
      const {
        productName,
        productPrice,
        productType,
        productId,
        qty,
      } = this.state.orderData[item];
      orderData.push({
        productId,
        productName,
        productPrice,
        qty,
        productType,
      });
    });
    console.log('KSKSKKSKSKHHSHSHSHHS', this.state.uid);
    mainOrderObject.orderData = orderData;
    db.ref('/shops/p58QMHdQmxUTHkB8eDD1EeDaMTj1/orders/' + this.state.uid)
      .set(mainOrderObject)
      .then(data => {
        this.setState({loading: false});
        Alert.alert('', 'Product add successfully');
        this.myOrders(mainOrderObject);
        this.sendPushNotification();
      })
      .catch(error => {
        this.setState({loading: false});
        Alert.alert('', 'Error for network request');
      });
  };
  sendPushNotification = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'key=AAAAZ2xZup0:APA91bFVoiH_44H1CEj1hMXgN2AI9O6Bfk7Qykz7GKd--9TzsQAl9Y9p06TVlbx1ATAgEpKQuE6G-Yxki7KlHwb3UZbV6Xwt2GsEY3LTBjBP9YogJkTbpKeEFe5HTW1IsD7Mn_Grp_mm',
    };
    const data = {
      notification: {
        title: 'Firebase',
        body: 'Firebase is awesome',
        click_action: 'http://localhost:3000/',
        icon: 'http://url-to-an-icon/icon.png',
      },
      to: this.state.token,
    };

    axios
      .post('https://fcm.googleapis.com/fcm/send', data, {
        headers: headers,
      })
      .then(response => {
        console.log('SKKSKSKSKSKKS', response);
      })
      .catch(error => {
        console.log('SKKSKSKSKSKKS', error);
      });
  };
  myOrders = mainOrderObject => {
    const refId = db.ref().push().key;
    console.log(
      'KSKSKSKKSKKSKKSKSKPATATAAAHAHHAHAHAHA',
      '/customer/' + this.state.uid + '/myOrders/' + refId,
    );
    db.ref('/customer/' + this.state.uid + '/myOrders/' + refId)
      .set(mainOrderObject)
      .then(data => {
        this.setState({loading: false});
        Alert.alert('', 'Product add successfully');
        this.clearCart();
      })
      .catch(error => {
        this.setState({loading: false});
        Alert.alert('', 'Error for network request');
      });
  };
  clearCart = () => {
    db.ref('/customer/' + this.state.uid + '/cart/')
      .set(null)
      .then(data => {
        this.setState({loading: false});
      })
      .catch(error => {
        this.setState({loading: false});
        Alert.alert('', 'Error for network request');
      });
  };

  render() {
    let orderKeys = Object.keys(this.state.orderData);
    totalPrice = 0;
    orderKeys.map(item => {
      const {productPrice, qty} = this.state.orderData[item];
      totalPrice = totalPrice + qty * productPrice;
      return item;
    });
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#00BCD4',
            height: 60,
            width: '100%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 10,
              width: 40,
              height: 40,
              justifyContent: 'center',
            }}
            onPress={this.backPress}>
            <Image
              style={{
                marginRight: 10,
                width: 30,
                height: 30,
                tintColor: '#FFFFFF',
              }}
              source={require('../../images/backArrow.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 20,
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Food Cartsssss
          </Text>
        </View>

        {this.state.orderCount === 0 && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                marginLeft: 20,
                color: '#525252',
                fontSize: 26,
                fontWeight: 'bold',
              }}>
              Cart Empty
            </Text>
          </View>
        )}

        {this.state.orderCount > 0 && (
          <CartList
            addItem={this.addItem}
            removeItem={this.removeItem}
            orderKeys={orderKeys}
            orderData={this.state.orderData}
            navigation={this.props.navigation}
          />
        )}
        {totalPrice > 0 && (
          <Button
            color="#00BCD4"
            mode="contained"
            onPress={this.continueOrder}
            style={{width: '70%', alignSelf: 'center'}}>
            Confirm delivery ₹{totalPrice}
          </Button>
        )}
      </View>
    );
  }
  addItem = (item, quantity, productId) => {
    let value = quantity + 1;
    db.ref('/customer/' + this.state.uid + '/cart/' + productId)
      .update({
        qty: value,
      })
      .then(data => {
        this.setState({loading: false});
        this.checkOrderCount();
        Alert.alert('', 'Product update successfully');
      })
      .catch(error => {
        this.setState({loading: false});
        Alert.alert('', 'Error for network request');
      });
  };
  removeItem = (item, quantity, productId) => {
    let value = quantity - 1;
    if (value === 0) {
      db.ref('/customer/' + this.state.uid + '/cart/' + productId).remove();
      Alert.alert('', 'Remove successfully');
    } else {
      db.ref('/customer/' + this.state.uid + '/cart/' + productId)
        .update({
          qty: value,
        })
        .then(data => {
          this.setState({loading: false});
          Alert.alert('', 'Product update successfully');
          this.checkOrderCount();
        })
        .catch(error => {
          this.setState({loading: false});
          Alert.alert('', 'Error for network request');
        });
    }
    // props.removeItemToCart(Object.assign(item, {quantity: value}));
  };
}

const mapStateToProps = state => {
  return {
    cartList: state.login.cart,
    cartQuantity: state.login.cartQuantity,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchAllMealData: bindActionCreators(fetchAllMealData, dispatch),
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodCart);
