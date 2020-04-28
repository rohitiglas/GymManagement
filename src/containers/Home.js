import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {setSelectedDrawerRow} from '../actions/loginActions';
import {bindActionCreators} from 'redux';
import styles from './styles';
import {fetchAllMealData} from '../actions/loginActions';
import MealList from './MealDataList';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      mealData: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.setState({isLoading: true});
    this.props.actions.fetchAllMealData(this.onSuccess, this.onError);
  }

  onSuccess = data => {
    this.setState({mealData: data.categories, isLoading: false});
  };
  onError = error => {
    this.setState({isLoading: false});
    Alert.alert('', 'Some error in api');
  };
  foo = b => {
    let a = 5;
    return a * b + 10;
  };
  bar = x => {
    let y = 5;
    return this.foo(x * y);
  };

  cartPress = () => {
    if (this.props.cartQuantity > 0) {
      this.props.navigation.navigate('FoodCart');
    }
  };

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#428d0c',
            height: 60,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginLeft: 20,
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Food Category
          </Text>

          <TouchableOpacity
            style={{marginRight: 20, width: 40, height: 40}}
            onPress={this.cartPress}>
            <Image
              style={{marginRight: 20, width: 40, height: 40}}
              source={require('../images/cart_icon.png')}
            />
          </TouchableOpacity>
          {this.props.cartQuantity !== 0 && (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                height: 25,
                width: 25,
                borderRadius: 12.5,
                borderColor: '#FFFFFF',
                borderWidth: 1,
                justifyContent: 'center',
                bottom: 30,
                position: 'absolute',
                right: 18,
              }}>
              <Text style={{textAlign: 'center'}}>
                {this.props.cartQuantity}
              </Text>
            </View>
          )}
        </View>
        {this.props.selectedRow === 'Home' && (
          <MealList
            mealData={this.state.mealData}
            navigation={this.props.navigation}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedRow: state.login.selectedDrawerRow,
    cartList: state.login.cart,
    cartQuantity: state.login.cartQuantity,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      fetchAllMealData: bindActionCreators(fetchAllMealData, dispatch),
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
