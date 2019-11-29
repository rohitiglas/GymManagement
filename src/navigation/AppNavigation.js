
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import RestaurantList from "../containers/Home";
import RestaurantDetails from "../containers/RestaurantDetails";
import FoodCart from "../containers/FoodCart";
import Login from "../containers/login/Login";
import Home from '../containers/dashboard/Home';
import LoginComponent from "../containers/login/LoginComponent";

import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomDrawerNavigator from "../components/customDrawerNavigator";
import Icon from 'react-native-vector-icons/FontAwesome';

















const AppStackNavigator = createStackNavigator(
    {
        LoginComponent: {screen: LoginComponent},
        Home: {screen: Home},
        RestaurantList: {screen: RestaurantList},
        FoodCart: {screen: FoodCart},
        RestaurantDetails: {screen: RestaurantDetails},

    }, {
        // see next line
        headerMode: 'none',
    })




const App = createAppContainer(AppStackNavigator);

export default App