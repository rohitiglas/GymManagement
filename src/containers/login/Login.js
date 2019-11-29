import React, {useState,memo,Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Toast from "../../components/Toast";
import {nameValidator,emailValidator,passwordValidator} from "../../utils/utils";
import {theme} from "../../utils/theme";
import CustomHeader from "../../components/customHeader";
import {bindActionCreators} from "redux";
import {fetchMealDetails, login, loginApiCall, setAddItemToCart, setRemoveItemToCart} from "../../actions/loginActions";
import {connect} from "react-redux";












const Login = ({ navigation }) => {
    const [name, setName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSuccess = (data) => {

        this.setState({ mealData:data.meals,isLoading: false })
        // const { navigation } = this.props;
        // navigation.navigate('home');
    }
    const onError = (error) => {




    }

    const _onSignUpPressed = async () => {

        //
        if (loading) return;


        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);



        if (emailError || passwordError) {

            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }
        // navigation.navigate("Home");
        // navigation.actions.loginApiCallAction(email,onSuccess, onError)

        loginApiCall("sskksksskksks")



    };

    return (
        <ScrollView>


            <Background>




                <Header>Login</Header>




                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={text => setEmail({ value: text, error: "" })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />

                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={text => setPassword({ value: text, error: "" })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <Button
                    loading={loading}
                    mode="contained"
                    onPress={_onSignUpPressed}
                    style={styles.button}
                >
                    Login
                </Button>



                <Toast message={error} onDismiss={() => setError("")} />
            </Background>
        </ScrollView>
    );
};



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



    return {
        login: item => {
            dispatch(loginApiCall(item))
        },

    }

}

export default connect(mapStateToProps, mapDispatchToProps)((memo(Login)));

