import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import * as SecureStore from "expo-secure-store";
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
import { generateCode } from "../utility/randomNumber";
const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Agent ID"),
    // password: Yup.string().required().min(4).label("Password"),
});

function ForgotPasswordScreen({ navigation }) {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [otp] = useState(generateCode());
    const handleSubmit = async (data) => {
        data.code = otp;
        const result = await authApi.forgotPassword(data);
        if (!result.ok) return setLoginFailed(true);
        setLoginFailed(false);
        await storeOtp();
        await storeEmail(data.email);
        navigation.navigate(routes.UPDATEPASSWORD);
        // auth.logIn(result.data);
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
            <Image source={require("../assets/logo_new.png")} resizeMode='contain' style={styles.logo} />
            <Form
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage
                    error="Invalid email"
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

                {/* <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <AppText style={{ alignSelf: "flex-end" }} onPress={() => navigation.navigate(routes.FORGOTPASSWORD)}>Forgot Password</AppText> */}
                <SubmitButton title="Reset" color={"primary"} />
            </Form>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 200,
        height: 80,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
    },
});

export default ForgotPasswordScreen;
