import React, { useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import CheckBox from 'expo-checkbox';
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import { Platform, ActivityIndicator } from "react-native";
import { generateCode } from "../utility/randomNumber";
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import AppText from "../components/Text";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Agent ID"),
    password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [error, setError] = useState(false);
    const [otp] = useState(generateCode());
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const handleSubmit = async ({ email, password }) => {
        setIsLoading(true);
        let code = otp;
        const result = await authApi.login(email, password, code);
        setIsLoading(false);
        // console.log(result.data);
        if (!result.ok) {
            setError(result.data)
            return setLoginFailed(true);
        }

        const decodedUser = auth.getUser(result.data);
        console.log(decodedUser);
        if (decodedUser.authType == 1) {
            await storeOtp();
            await storeEmail(email);
            navigation.navigate(routes.OTP, result.data);
        }
        else {
            setLoginFailed(false);
            auth.logIn(result.data);
        }


    };
    const storeOtp = async () => {
        try {
            await SecureStore.setItemAsync('otpKey', otp);
        } catch (error) {
            console.log("Error storing the auth token", error);
        }
    };
    const storeEmail = async (email) => {
        try {
            await SecureStore.setItemAsync('emailKey', email);
        } catch (error) {
            console.log("Error storing the auth token", error);
        }
    };
    return (
        <Screen style={styles.container}>
            {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
            {/* <AppText style={{ fontSize: 30, marginTop: Platform.OS === "android" ? -20 : 0, textAlign: "left", marginBottom: 10, fontWeight: Platform.OS === "android" ? 800 : 600 }}>Enter your Credentials</AppText>
             */}
            <Image source={require("../assets/logo_new.png")} resizeMode='contain' style={styles.logo} />
            <Form
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage
                    error={error}
                    visible={loginFailed}
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Agent ID"
                    textContentType="emailAddress"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry={isPassword}
                    textContentType="password"
                />
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={() => { setSelection(!isSelected); setIsPassword(!isPassword) }}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Show Password?</Text>
                </View>
                <AppText style={{ alignSelf: "flex-end" }} onPress={() => navigation.navigate(routes.FORGOTPASSWORD)}>Forgot Password</AppText>
                {isLoading && <ActivityIndicator />}

                <SubmitButton title="Login" color={"primary"} />
            </Form>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: Platform.OS === "android" ? 10 : 10,
    },
    // logo: {
    //     //width: 300,
    //     height: 100,
    // },
    logo: {
        width: 200,
        height: 80,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: "flex-end"
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
        textAlign: "right"
    },
});

export default LoginScreen;
