import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import RestaurantList from '../containers/Home';
import RestaurantDetails from '../containers/RestaurantDetails';
import FoodCart from '../containers/cart/FoodCart';
import Home from '../containers/dashboard/Home';
import CustomerLoginComponent from '../containers/login/CustomerLoginComponent';
import LoginComponent from '../containers/auth/LoginScreen';
import RegisterComponent from '../containers/auth/RegisterScreen';
import ForgetComponent from '../containers/auth/ForgotPasswordScreen';
import UpdateUserDetailsComponent from '../containers/updateUserDetails/UpdateUserDetails';
import AdminLoginComponent from '../containers/admin/AdminLoginComponent';
import WelcomeComponent from '../containers/welcome/WelcomeScreen';
import OtpComponent from '../containers/otp/OtpVerify';
import LauncherScreen from '../containers/splash/LauncherScreen';
import DrawerContent from '../components/DrawerContent';

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {screen: Home},
  },
  {
    contentComponent: DrawerContent,
  },
);
// const AdminDrawerNavigator = createDrawerNavigator(
//   {
//     AdminHome: {screen: AdminHome},
//   },
//   {
//     contentComponent: DrawerContent,
//   },
// );

const AppStackNavigator = createStackNavigator(
  {
    LauncherScreen: {screen: LauncherScreen},
    LoginComponent: {screen: LoginComponent},
    RegisterComponent: {screen: RegisterComponent},
    ForgetComponent: {screen: ForgetComponent},
    CustomerLoginComponent: {screen: CustomerLoginComponent},
    AdminLoginComponent: {screen: AdminLoginComponent},
    WelcomeComponent: {screen: WelcomeComponent},
    OtpComponent: {screen: OtpComponent},
    UpdateUserDetailsComponent: {screen: UpdateUserDetailsComponent},
    Home: {screen: MyDrawerNavigator},
    RestaurantList: {screen: RestaurantList},
    FoodCart: {screen: FoodCart},
    RestaurantDetails: {screen: RestaurantDetails},
  },
  {
    // see next line
    headerMode: 'none',
  },
);

const App = createAppContainer(AppStackNavigator);

export default App;
