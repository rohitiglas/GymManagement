import Background from "../../components/Background";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Toast from "../../components/Toast";
import {ScrollView, StyleSheet,Alert} from "react-native";
import React, {Component, memo} from "react";
import {theme} from "../../utils/theme";

import {connect} from "react-redux";
import {emailValidator, passwordValidator} from "../../utils/utils";
import {bindActionCreators} from "redux";
import * as loginActions from '../../actions/loginActions';
import {saveToken} from "../../utils/storage";
import { NavigationActions, StackActions } from 'react-navigation';
import Loader from "../../components/Loader";


class LoginComponent extends Component{
    constructor()
    {
        super();
        this.state={
            loading:false,
            email:'',password:'',emailError:'',passwordError:''
        }
    }




    onSuccess = (data) => {
        this.setState({ loading: false });
       if(data.data)
       {
           if (data.data.token && data.data.token.length > 0) {
               saveToken(data.data.token).then((isSuccess) => {
                   if (isSuccess) {
                       const { navigation } = this.props;
                       const resetAction = StackActions.reset({
                           index: 0,
                           actions: [
                               NavigationActions.navigate({ routeName: 'Home' }),
                           ],
                       });
                       navigation.dispatch(resetAction);
                   }
               });
           }
       }

    }

    onError = (error) => {
        console.log("lslslslslls",error)
        this.setState({loading:false})
        Alert.alert('',error.message);



    }
    _onSignUpPressed =  () => {

        const emailError = emailValidator(this.state.email);
        const passwordError = passwordValidator(this.state.password);



        if (emailError || passwordError) {

            this.setState({ ...this.state.email, emailError: emailError });
            this.setState({ ...this.state.password, passwordError: passwordError });
            return;
        }
        this.setState({loading:true,emailError:'',passwordError:''})

        this.props.actions.login.login({email:this.state.email,password:this.state.password},this.onSuccess,this.onError)



    };
    render()
    {
        return(
            <ScrollView>


                <Background>




                    <Header>Gym Management</Header>

                    <Loader loading={this.state.loading} />




                    <TextInput
                        label="Email"
                        returnKeyType="next"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text, error: "" })}
                        error={!!this.state.emailError}
                        errorText={this.state.emailError}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={this.state.password}
                        error={this.state.passwordError}
                        errorText={this.state.passwordError}
                        onChangeText={text => this.setState({ password: text, error: "" })}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <Button
                        mode="contained"
                        onPress={this._onSignUpPressed}
                        style={styles.button}
                    >
                        Login
                    </Button>




                </Background>
            </ScrollView>
        )
    }

}


const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary
    },
    button: {
        backgroundColor:'#FF5722',
        marginTop: 24
    },
    row: {
        flexDirection: "row",
        marginTop: 4
    },
    link: {
        fontWeight: "bold",
        color: theme.colors.primary
    }
});

const mapStateToProps = (state) => {


    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            login: bindActionCreators(loginActions, dispatch)
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)((memo(LoginComponent)));
