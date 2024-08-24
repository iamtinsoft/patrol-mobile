import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import ViewServiceProvidersScreen from "../screens/ViewServiceProvidersScreen";
import BookingsScreen from "../screens/BookingsScreen";
import FeedbackScreen from "../screens/FeedbackScreen";

const Stack = createStackNavigator();

const AppointmentsNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bookings" component={BookingsScreen} />
        <Stack.Screen name="ServiceProviders" component={FeedbackScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
);

export default AppointmentsNavigator;
