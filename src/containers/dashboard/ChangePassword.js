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


class ChangePassword extends Component{
    constructor()
    {
        super();
        this.state={
            loading:false,
            email:'',oldPassword:'',newPassword:'',error:''
        }
    }




    onSuccess = (data) => {
        this.setState({ loading: false });

    }

    onError = (error) => {
        this.setState({loading:false})
        Alert.alert('',data.message);



    }
    _onSignUpPressed =  () => {
        this.setState({loading:true})

        this.props.actions.changePassword.changePassword(
            {email:this.props.userInfo.email,
            password:this.state.oldPassword,
                newPassword:this.state.newPassword
            },
            this.onSuccess,this.onError)



    };
    render()
    {
        return(
            <ScrollView>


                <Background>




                    <TextInput
                        label="Old-Password"
                        returnKeyType="done"
                        value={this.state.oldPassword}
                        onChangeText={text => this.setState({ oldPassword: text, error: "" })}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <TextInput
                        label="New-Password"
                        returnKeyType="done"
                        value={this.state.newPassword}
                        onChangeText={text => this.setState({ newPassword: text, error: "" })}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <Button
                        loading={this.state.loading}
                        mode="contained"
                        onPress={this._onSignUpPressed}
                        style={styles.button}
                    >
                        Submit
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
    console.log("ksssssssssssssssjjjajChangePassword",state.login)


    return {
        userInfo:state.login.userInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            changePassword: bindActionCreators(loginActions, dispatch)
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)((memo(ChangePassword)));