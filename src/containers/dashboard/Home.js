import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loader from '../../components/Loader';
import {
  fetchAllMealData,
  setAddItemToCart,
  setRemoveItemToCart,
  setSelectedDrawerRow,
} from '../../actions/loginActions';
import MealList from './MealDataList';
import styles from './styles';
import {db} from '../../core/config';
import MyOrder from '../myOrders/MyOrder';
import ProfileDetails from '../profile/ProfileDetails';
import PushNotification from 'react-native-push-notification';

class Home extends PureComponent {
  constructor() {
    super();
    this.state = {
      firstTime: true,
      refreshLoader: false,
      token: '',
      isLoading: true,
      attendance: {},
      userInfo: {},
      productData: [],
      orderCount: 0,
      orderData: [],
      newProductData: [],
      uid: '',

      isAttendanceMark: false,
    };
    AsyncStorage.getItem('uid')
      .then(data => {
        this.setState({uid: data});
      })
      .catch(() => {
        this.setState({uid: ''});
      });
  }
  // static getDerivedStateFromProps(props, state) {
  //   const newArray = [];
  //   let orderKeys = [];
  //   db.ref('/p58QMHdQmxUTHkB8eDD1EeDaMTj1/products/').on(
  //     'value',
  //     querySnapShot => {
  //       let data = querySnapShot.val() ? querySnapShot.val() : {};
  //       let todosKeys = Object.keys({...data});
  //       todosKeys.map(item => {
  //         data[item].qty = 0;
  //         newArray.push(data[item]);
  //       });
  //       db.ref('/' + state.uid + '/cart/').on('value', querySnapShot => {
  //         let orderData = querySnapShot.val() ? querySnapShot.val() : {};
  //         orderKeys = Object.keys({...orderData});
  //         orderKeys.map(item => {
  //           newArray.map(productItem => {
  //             if (productItem.productId === orderData[item].productId) {
  //               productItem.qty = orderData[item].qty;
  //             }
  //             return productItem;
  //           });
  //           return item;
  //         });
  //       });
  //     },
  //   );
  //   return {
  //     orderKeys: orderKeys,
  //     orderCount: orderKeys.length,
  //     newProductData: newArray,
  //     titleName: 'My Products',
  //     editItem: {},
  //     isLoading: false,
  //   };
  // }
  componentDidMount() {
    this.getProductData();
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token);
        AsyncStorage.setItem('fcmToken', token.token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: '444199451293',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }
  getProductData = () => {
    this.setState({isLoading: true});
    // db.ref('/p58QMHdQmxUTHkB8eDD1EeDaMTj1/products/').on(
    //   'value',
    //   querySnapShot => {
    //     let data = querySnapShot.val() ? querySnapShot.val() : {};
    //     this.setState({productData: {...data}, isLoading: false});
    //   },
    // );
    const newArray = [];
    let orderKeys = [];
    db.ref('/shops/p58QMHdQmxUTHkB8eDD1EeDaMTj1/products/').on(
      'value',
      querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        console.log('KSKKSKSKKKSComponentDidMount()', data);
        let todosKeys = Object.keys({...data});
        todosKeys.map(item => {
          data[item].qty = 0;
          newArray.push(data[item]);
        });
        db.ref('/customer/' + this.state.uid + '/cart/').on(
          'value',
          querySnapShot => {
            let orderData = querySnapShot.val() ? querySnapShot.val() : {};
            orderKeys = Object.keys({...orderData});
            orderKeys.map(item => {
              newArray.map(productItem => {
                if (productItem.productId === orderData[item].productId) {
                  productItem.qty = orderData[item].qty;
                }
                return productItem;
              });
              return item;
            });
          },
        );
      },
    );
    this.setState({
      orderKeys: orderKeys,
      orderCount: orderKeys.length,
      newProductData: newArray,
      titleName: 'My Products',
      editItem: {},
      isLoading: false,
    });
  };
  cartPress = () => {
    this.props.navigation.navigate('FoodCart');
  };

  _goBack = () => this.props.navigation.openDrawer();

  addItem = (item, quantity, productId) => {
    this.setState({isLoading: true});
    let value = quantity + 1;
    db.ref('/customer/' + this.state.uid + '/cart/' + productId)
      .update({
        qty: value,
      })
      .then(data => {
        this.checkOrderCount();
        Alert.alert('', 'Product update successfully');
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert('', 'Error for network request');
      });
  };
  removeItem = (item, quantity, productId) => {
    this.setState({isLoading: true});
    let value = quantity - 1;
    if (value === 0) {
      db.ref('/customer/' + this.state.uid + '/cart/' + productId).remove();
      this.checkOrderCount();
      Alert.alert('', 'Remove successfully');
    } else {
      db.ref('/customer/' + this.state.uid + '/cart/' + productId)
        .update({
          qty: value,
        })
        .then(data => {
          Alert.alert('', 'Product update successfully');
          this.checkOrderCount();
        })
        .catch(error => {
          this.setState({isLoading: false});
          Alert.alert('', 'Error for network request');
        });
    }
    // props.removeItemToCart(Object.assign(item, {quantity: value}));
  };
  addProductFromCart = (item, quantity) => {
    const {productName, productPrice, productId, productType} = item;
    this.setState({isLoading: true});
    db.ref('/customer/' + this.state.uid + '/cart/' + productId)
      .set({
        productId: productId,
        productType,
        productName,
        productPrice,
        qty: 1,
      })
      .then(data => {
        Alert.alert('', 'Order add successfully');
        this.checkOrderCount();
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert('', 'Error for network request');
      });
    this.checkOrderCount();
  };
  checkOrderCount = () => {
    const newArray = [];
    let orderKeys = [];
    db.ref('/shops/p58QMHdQmxUTHkB8eDD1EeDaMTj1/products/').on(
      'value',
      querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        console.log('KSKKSKSKSKS', data);
        let todosKeys = Object.keys({...data});
        todosKeys.map(item => {
          data[item].qty = 0;
          newArray.push(data[item]);
        });
        db.ref('/customer/' + this.state.uid + '/cart/').on(
          'value',
          querySnapShot => {
            let orderData = querySnapShot.val() ? querySnapShot.val() : {};
            orderKeys = Object.keys({...orderData});
            orderKeys.map(item => {
              newArray.map(productItem => {
                if (productItem.productId === orderData[item].productId) {
                  productItem.qty = orderData[item].qty;
                }
                return productItem;
              });
              return item;
            });
          },
        );
      },
    );
    this.setState({
      orderKeys: orderKeys,
      orderCount: orderKeys.length,
      newProductData: newArray,
      titleName: 'My Products',
      editItem: {},
      isLoading: false,
    });
  };

  render() {
    let todosKeys = Object.keys(this.state.productData);
    let orderKeys = Object.keys(this.state.orderData);
    // console.log('QQQQQQQQQQQQQ', this.state.newProductData);
    return (
      <View style={{flex: 1}}>
        <Loader loading={this.state.isLoading} />
        <View style={styles.headerView}>
          <TouchableOpacity onPress={this._goBack}>
            <Image
              source={require('../../images/hamburger.png')}
              style={styles.hamburgerIcon}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            {this.props.selectedRow === 'Home' ? 'Products' : 'My Orders'}
          </Text>

          <TouchableOpacity style={styles.touchIcon} onPress={this.cartPress}>
            <Image
              style={styles.cartImage}
              source={require('../../images/cart_icon.png')}
            />
          </TouchableOpacity>
          {this.state.orderCount !== 0 && (
            <View style={styles.quantityView}>
              <Text style={{textAlign: 'center'}}>{this.state.orderCount}</Text>
            </View>
          )}
        </View>
        {this.props.selectedRow === 'Home' && (
          <MealList
            addItem={this.addItem}
            removeItem={this.removeItem}
            productData={this.state.productData}
            newProductData={this.state.newProductData}
            orderData={this.state.orderData}
            addProductFromCart={this.addProductFromCart}
            isLoading={this.state.refreshLoader}
            onRefreshProductData={this.getProductData}
            mealData={todosKeys}
            orderKeys={orderKeys}
            navigation={this.props.navigation}
          />
        )}
        {this.props.selectedRow === 'MyOrder' && <MyOrder />}
        {this.props.selectedRow === 'MyProfile' && (
          <ProfileDetails
            clickRow={() => this.props.drawerSelectedRow('Home')}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedRow: state.login.selectedDrawerRow,
    userInfo: state.login.userInfo,
    userPunch: state.login.userPunch,
    cartQuantity: state.login.cartQuantity,
    cartList: state.login.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchAllMealData: bindActionCreators(fetchAllMealData, dispatch),
    },
    addItemToCart: item => {
      dispatch(setAddItemToCart(item));
    },
    removeItemToCart: item => {
      dispatch(setRemoveItemToCart(item));
    },
    drawerSelectedRow: item => {
      dispatch(setSelectedDrawerRow(item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
