import React, { useState } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import * as Yup from "yup";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import * as SecureStore from "expo-secure-store";
import CheckBox from 'expo-checkbox';
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
    otp: Yup.number().required().label("Otp"),
    password: Yup.string().required().min(4).label("Password"),
});

function UpdatePasswordScreen({ navigation }) {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [isSuccessfull, setIsSuccessfull] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const handleSubmit = async (data) => {
        const yu = await getOtp();
        const email = await getEmail();
        if (yu !== data.otp) {
            setLoginFailed(true);
        }
        else {
            data.email = email;
            const result = await authApi.updatePassword(data);
            console.log(result);
            if (!result.ok) return setLoginFailed(true);
            setIsSuccessfull(true);
        }
        // const result = await authApi.login(email, password);
        // if (!result.ok) return setLoginFailed(true);
        // setLoginFailed(false);
        // auth.logIn(result.data);
    };
    const getOtp = async () => {
        try {
            return await SecureStore.getItemAsync('otpKey');
        } catch (error) {
            console.log("Error getting the auth token", error);
        }
    };
    const getEmail = async () => {
        try {
            return await SecureStore.getItemAsync('emailKey');
        } catch (error) {
            console.log("Error getting the auth token", error);
        }
    };
    return (
        <Screen style={styles.container}>
            {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
            {/* <AppText style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 10 }} onPress={() => navigation.navigate(routes.FORGOTPASSWORD)}>Enter your Credentials</AppText> */}
            <Image source={require("../assets/logo_new.png")} resizeMode='contain' style={styles.logo} />
            <Form
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage
                    error="Invalid Otp Entered."
                    visible={loginFailed}
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    // icon="lock"
                    name="otp"
                    placeholder="One time Passcode"
                // secureTextEntry
                //textContentType="password"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    // icon="lock"
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
                {isSuccessfull && <AppText onPress={() => navigation.navigate(routes.LOGIN)}>Password Updated Successfully, Click to login</AppText>}

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
        textAlign: "right",
        color: "black"
    },
});

export default UpdatePasswordScreen;
