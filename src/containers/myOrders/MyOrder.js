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
import {bindActionCreators} from 'redux';
import styles from '../styles';
import {fetchAllMealData} from '../../actions/loginActions';
import OrderList from './OrderList';
import Button from '../../components/Button';
import {db} from '../../core/config';
import axios from 'axios';
let totalPrice = 0;

class MyOrder extends Component {
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
      shopName: '',
      shopAddress: '',
      shopMobileNumber: '',
      customerName: '',
      cutomerAddress: '',
      customerMobileNumber: '',
    };
    AsyncStorage.getItem('uid')
      .then(data => {
        this.setState({uid: data});
      })
      .catch(() => {
        this.setState({uid: ''});
      });
  }
  componentDidMount() {
    this.checkOrderCount();
  }
  getShopDetails = uid => {
    db.ref('/shops/p58QMHdQmxUTHkB8eDD1EeDaMTj1/customerDetails/').on(
      'value',
      querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        this.setState({
          shopName: data.shopName,
          shopAddress: data.shopAddress,
          shopMobileNumber: data.shopMobile,
          token: data.token,
        });
      },
    );
  };
  getCustomerDetails = uid => {
    db.ref('/customer/' + uid + '/customerDetails/').on(
      'value',
      querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        this.setState({
          shopName: data.name,
          shopAddress: data.address,
          customerMobileNumber: data.mobileNumber,
        });
      },
    );
  };
  checkOrderCount = () => {
    AsyncStorage.getItem('uid')
      .then(uid => {
        db.ref('/customer/' + uid + '/myOrders/').on('value', querySnapShot => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          let todosKeys = Object.keys({...data});
          this.setState({
            uid,
            orderData: {...data},
            orderCount: todosKeys.length,
            isLoading: false,
          });
          this.getCustomerDetails(uid);
          this.getShopDetails();
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
    console.log('KKSKSKKSKSKSKSSKSUId+++++++++++', this.state.uid);
    const {
      customerName,
      customerAddress,
      customerMobileNumber,
      shopName,
      shopAddress,
      shopMobileNumber,
    } = this.state;
    let orderKeys = Object.keys(this.state.orderData);
    const mainOrderObject = {};
    mainOrderObject.totalPrice = totalPrice;
    mainOrderObject.customerName = customerName;
    mainOrderObject.customerAddress = customerAddress;
    mainOrderObject.customerMobileNumber = customerMobileNumber;
    mainOrderObject.shopName = shopName;
    mainOrderObject.shopAddress = shopAddress;
    mainOrderObject.shopMobileNumber = shopMobileNumber;
    // mainOrderObject.push({totalPrice});
    let orderData = [];
    orderKeys.map(item => {
      const {
        productName,
        productPrice,
        imageUrl,
        productId,
        qty,
      } = this.state.orderData[item];
      orderData.push({
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        productQty: qty,
      });
    });
    mainOrderObject.orderData = orderData;
    db.ref('/shops/p58QMHdQmxUTHkB8eDD1EeDaMTj1/orders/' + this.state.uid)
      .set(mainOrderObject)
      .then(data => {
        this.setState({loading: false});
        Alert.alert('', 'Product add successfully');
        this.myOrders(mainOrderObject);
      })
      .catch(error => {
        this.setState({loading: false});
        Alert.alert('', 'Error for network request');
      });
  };
  myOrders = mainOrderObject => {
    db.ref('/customer/' + this.state.uid + '/myOrders/')
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
          <OrderList
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
)(MyOrder);
