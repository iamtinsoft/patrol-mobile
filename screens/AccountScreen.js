import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import AppText from "../components/Text";
import { ServerUrl } from "./../config/settings";
import appointmentApi from "../api/appointments";
import authApi from "../api/auth";
import ResponseModal from "../components/modals/ResponseModal";
const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  // {
  //   title: "My Messages",
  //   icon: {
  //     name: "email",
  //     backgroundColor: colors.secondary,
  //   },
  //   targetScreen: routes.MESSAGES,
  // },
];
function AccountScreen({ navigation }) {
  const { user, logOut, logIn } = useAuth();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  console.log(user);
  const confirmLogout = () =>
    Alert.alert('Are you sure you want to logout', 'Confirm', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => logOut() },
    ]);
  const confirm2FA = (arg) =>
    Alert.alert(`Are you sure you want to ${arg == 1 ? "enable" : "Disable"} Two factor Authentication`, 'Please Confirm', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => updateAuthStatus(arg) },
    ]);
  const cancelAppointment = async (item) => {
    const result = await appointmentApi.deleteBooking(item);
    console.log(result);
    if (!result.ok) return setErrorModalVisible(true);
    setSuccessModalVisible(true);
    getListingsApi.request(auth.user.id);
  }
  const updateAuthStatus = async (arg) => {
    // setIsLoading(true);
    const dataObject = {
      authType: arg,
      email: user.email
    }
    const result = await authApi.updateAuthStatus(dataObject);
    if (!result.ok) return setErrorModalVisible(true);
    setSuccessModalVisible(true);
    logIn(result.data);

  }
  return (
    <Screen style={styles.screen}>
      <ResponseModal title={"An Error has occurred"} subTitle={"Record could not be deleted"} status={errorModalVisible} />
      <ResponseModal title={"Success"} subTitle={"Profile Updated successfully"} status={successModalVisible} />
      <View style={styles.container}>

        <ListItem
          title={user.firstName + " " + user.lastName}
          subTitle={user.email}
          image={{ uri: ServerUrl + user.avatarUrl }}
        />
      </View>
      <View style={styles.textContainer}>
        <AppText style={{ fontSize: 30, fontWeight: 500 }}>My Bio</AppText>
        <AppText style={styles.text}>{user.bio}</AppText>
      </View>
      {/* <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View> */}

      <ListItem
        title="Edit Account"
        IconComponent={<Icon name="account-cog" backgroundColor={colors.primary} />}
        onPress={() => navigation.navigate(routes.ACCOUNT_EDIT)}
      />
      {user.authType == 1 ? <ListItem
        title="Disable 2FA"
        IconComponent={<Icon name="account-cog" backgroundColor={colors.medium} />}
        onPress={() => confirm2FA(0)}
      /> : <ListItem
        title="Enable 2FA"
        IconComponent={<Icon name="account-cog" backgroundColor={colors.medium} />}
        onPress={() => confirm2FA(1)}
      />}
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => confirmLogout()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 10,
  },

  textContainer: {
    marginVertical: 20,
    backgroundColor: colors.white,
    padding: 20
  },
});

export default AccountScreen;
