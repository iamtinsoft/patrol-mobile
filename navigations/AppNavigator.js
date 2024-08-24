import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import BookingsScreen from "../screens/BookingsScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import navigation from "./rootNavigation";
//import useNotifications from "../hooks/useNotifications";
import colors from "../config/colors";
import AppointmentsNavigator from "./AppointmentsNavigator";
import MenuScreen from "../screens/MenuScreen";
import NavHeader from "../components/header/NavHeader";

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AppNavigator = () => {
  // useNotifications();

  return (
    <Stack.Navigator
    // screenOptions={{ header: NavHeader }}
    // screenOptions={{
    //   title: 'DP Patrol',
    //   headerStyle: {
    //     backgroundColor: colors.primary,

    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //     textAlign: "center"
    //   },
    // }}
    >

      <Stack.Screen
        name="Welcome"
        component={MenuScreen}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: true }} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: true }} /> */}
    </Stack.Navigator>
    // <Tab.Navigator screenOptions={{
    //   // headerStyle: {
    //   //   backgroundColor: colors.primary
    //   // }, headerTintColor: "black",
    //   //tabBarShowLabel: false
    // }}>
    //   <Tab.Screen
    //     name="Home"
    //     component={FeedNavigator}
    //     options={{

    //       tabBarLabelStyle: {
    //         fontSize: 15,
    //       },

    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="home" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   {/* <Tab.Screen
    //     name="ListingEdit"
    //     component={ListingEditScreen}
    //     options={({ navigation }) => ({
    //       tabBarButton: () => (
    //         <NewListingButton
    //           onPress={() => navigation.navigate(routes.LISTING_EDIT)}
    //         />
    //       ),
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons
    //           name="plus-circle"
    //           color={color}
    //           size={size}
    //         />
    //       ),
    //     })}
    //   /> */}
    //   <Tab.Screen
    //     name="Bookings"
    //     component={AppointmentsNavigator}
    //     options={{
    //       tabBarLabelStyle: {
    //         fontSize: 15,
    //       },
    //       tabBarLabel: "Appointments",
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="calendar-multiselect" color={color} size={size} />
    //       ),

    //     }}
    //   />
    //   {/* <Tab.Screen
    //     name="Notifications"
    //     component={AccountNavigator}
    //     options={{
    //       tabBarLabelStyle: {
    //         fontSize: 15,
    //       },
    //       tabBarBadge: 4,
    //       tabBarBadgeStyle: {

    //       },
    //       tabBarLabel: "Notifications",
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="bell" color={color} size={size} />
    //       ),
    //     }}
    //   /> */}
    //   <Tab.Screen
    //     name="Account"
    //     component={AccountNavigator}
    //     options={{
    //       tabBarLabelStyle: {
    //         fontSize: 15,
    //       },
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="account" color={color} size={size} />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
  );
};

export default AppNavigator;
