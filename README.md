# GymManagement
Gym

<div align="center">
    <img src="https://user-images.githubusercontent.com/17780617/69953091-87d05100-151e-11ea-8081-d06ccd56eb3e.gif"
         </img> 
</div>

Work Flow:

I have used these dependencies :
1. axios
2. react-native-gesture-handler
3. react-native-paper
4. react-native-reanimated
5. react-native-screens": "^2.0.0-alpha.11",
6. react-native-splash-screen
7. react-native-status-bar-height
8. react-native-vector-icons
9. react-navigation
10.react-navigation-drawer
11.react-navigation-stack
12.react-redux
13.redux
14.redux-saga



1. Created a directory name src
2.In src, I have created another directory name navigation
3.In Naviagtion directory, I have created a file name Navigation.js .In this file i have used (react-navigation),(react-navigation-stack), (react-navigation-drawer) for navigation and drawer functionality. and also i have imports screens component that i have to show in app.
4.I have created a file name App.js ,In this file I have initialized Redux-Saga(Middleware) ,Provider(Redux) ,Reducer and import the navigations.
5.I have created a directory name service ,In this directory i have taken 3 files name : api,loginApi.
6. In api file i have define the Base Url and also define Axios.create().
7.In loginApi file i have exported methods according to the networking calling requirement like LoginApiCall(),ChangePasswordApiCall().
8.Now we can discusss about the redux implementaion :
I have created 2 directory name Actions,Reducers.We have declared the Store in App.js file.
So the time is to implement Redux.
In LoginScreen ,We can see that We have Email and Password TextInput .and a login button .I have imported  connect() from 'react-redux'.
and have defined two methods name :
1. mapDispatchToProps() : in this method basically used to dispatch an action to the store.
2. mapStateToProps() :   This method is used to get the state from store and convert the state to props.

So when we tap tap login button the we are dispacth an action and passing the data like email and password. 
I have used bindActionCreators() for bind the actions to ActionCreator.I have define a action creator in Actions name login().

and also i have created a director name saga--> loginSaga file ---> In this file i have created two generator method name 

export function* watchLoginApiCall() {
    yield takeLatest(types.LOGIN_API_CALL, loginApiCall)
}

export function* loginApiCall(action) {
}

and defined the generator in rootSaga().

When we get the data successfully and get the error then passed it to Reducer and according to action type we are updtaing the state value .And get the state data in mapStateToProps() and change the data in our component.









