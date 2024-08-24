import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "../screens/LoginScreen";

import WelcomeScreen from "./../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import UpdatePasswordScreen from "../screens/UpdatePasswordScreen";
import OtpScreen from "../screens/OtpScreen";
const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }} />

    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: true }} />
    <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} options={{ headerShown: true }} />
    <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

export default AuthNavigator;
