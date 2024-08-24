import React, { useState } from "react";
import { StyleSheet, Platform, Image, ScrollView, ActivityIndicator, Text, View } from "react-native";
import * as Yup from "yup";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
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
import DatePicker from "../components/forms/DatePicker";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    email: Yup.string().required().email().label("Email"),
    phoneNo: Yup.string().required().label("PhoneNo"),
    // dob: Yup.string().required().label("Date of Birth"),
    password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ navigation }) {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleSubmit = async (data) => {
        // data.dob = selectedDate;
        setIsLoading(true);
        setLoginFailed(false);
        const result = await authApi.register(data);
        setIsLoading(false);
        if (!result.ok) return setLoginFailed(true);
        setIsSuccessful(true);
        // auth.logIn(result.data);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
        //getServicesProviderApi.request(props.route.params.id);
    }
    return (
        <Screen style={styles.container}>
            {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
            <ScrollView>
                <AppText style={{ fontSize: 30, marginTop: Platform.OS === "android" ? -5 : 0, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Fill your Details</AppText>
                <Form
                    initialValues={{ email: "", firstName: "", lastName: "", password: "", dob: "", phoneNo: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage
                        error="Invalid email and/or password."
                        visible={loginFailed}
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="firstName"
                        placeholder="Enter FirstName"
                    // textContentType="emailAddress"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="lastName"
                        placeholder="Enter LastName"
                    // textContentType="emailAddress"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder="Email"
                        textContentType="emailAddress"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="phoneNo"
                        placeholder="Enter Phone Number"
                    // textContentType="emailAddress"
                    />
                    {/* <Text>{"Dob : " + selectedDate}</Text>
                    <DatePicker title="Date of Birth" handleonDateChange={(e) => handleDateChange(e)} /> */}
                    {/* <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="dob"
                        placeholder="Enter Date of Birth"
                        textContentType="birthdate"
                    /> */}
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
                    <AppText style={{ alignSelf: "flex-end", color: "orange" }} onPress={() => navigation.navigate(routes.LOGIN)}>Have an Account Login</AppText>
                    {isLoading && <ActivityIndicator />}
                    {isSuccessful && <AppText style={{ textAlign: "center", fontWeight: "bold", fontSize: 22, color: "green" }}>Registration Successfull Please Login to Continue</AppText>}
                    <SubmitButton title="Sign Up" color={"secondary"} />
                </Form>
            </ScrollView>

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
        textAlign: "right"
    },
});

export default RegisterScreen;
