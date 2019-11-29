import Background from "../../components/Background";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Toast from "../../components/Toast";
import {ScrollView, StyleSheet} from "react-native";
import React, {Component, memo} from "react";
import {theme} from "../../utils/theme";

import {connect} from "react-redux";
import {emailValidator, passwordValidator} from "../../utils/utils";
import {bindActionCreators} from "redux";
import * as loginActions from '../../actions/loginActions';


class LoginComponent extends Component{
    constructor()
    {
        super();
        this.state={
            loading:false,
            email:'',password:'',error:''
        }
    }
    onSuccess = (data) => {
        console.log("SUcess----------------------",data)

    }
    onError = (error) => {
        console.log("Error----------------------",error)


    }
    _onSignUpPressed =  () => {

        this.props.actions.login.login({email:this.state.email,password:this.state.password},this.onSuccess,this.onError)



    };
    render()
    {
        return(
            <ScrollView>


                <Background>




                    <Header>Login</Header>




                    <TextInput
                        label="Email"
                        returnKeyType="next"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text, error: "" })}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text, error: "" })}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <Button
                        loading={this.state.loading}
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
    console.log("ROhittnnnfnfnffffffffffffff","-----------Called")





    return {
        actions: {
            login: bindActionCreators(loginActions, dispatch)
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)((memo(LoginComponent)));