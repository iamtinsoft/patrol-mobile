import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import ViewServiceProvidersScreen from "../screens/ViewServiceProvidersScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={HomeScreen} />
    <Stack.Screen name="ServiceProviders" component={ViewServiceProvidersScreen} options={{ headerShown: true }} />
  </Stack.Navigator>
);

export default FeedNavigator;
