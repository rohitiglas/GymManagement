import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Home from '../containers/dashboard/Home';

import LoginComponent from '../containers/login/LoginComponent';
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

const AppStackNavigator = createStackNavigator(
  {
    LauncherScreen: {screen: LauncherScreen},
    LoginComponent: {screen: LoginComponent},
    Home: {screen: MyDrawerNavigator},
  },
  {
    // see next line
    headerMode: 'none',
  },
);

const App = createAppContainer(AppStackNavigator);

export default App;
