import React from 'react'
import { StyleSheet, ImageBackground, View, Image } from "react-native";
import AppText from '../components/Text';
import { Platform, ActivityIndicator } from "react-native";
import Button from "../components/Button";
import routes from "../navigations/routes";
import colors from '../config/colors';
import Screen from '../components/Screen';
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import NavHeader from '../components/header/NavHeader';
import MainScreen from '../components/MainScreen';
const MenuScreen = ({ navigation }) => {
    const { user, logOut, logIn } = useAuth();
    return (
        <MainScreen>

            <View
                style={style.background}

            >

                <View style={{ margin: 0 }}>
                    <Image source={require("../assets/logo_new.png")} resizeMode='contain' style={style.logo} />

                </View>
                <AppText style={{ fontSize: 30, marginTop: Platform.OS === "android" ? -10 : 0, textAlign: "center", marginBottom: 10, fontWeight: Platform.OS === "android" ? 800 : 600 }}>Welcome {user.firstName + " " + user.lastName}</AppText>

                <View style={style.menuContainer}>
                    <View style={style.item}>
                        <View style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
                            <MaterialCommunityIcons
                                name={"chat-question"}
                                size={80}
                                color={defaultStyles.colors.light}

                            />
                            <AppText style={{ color: "white", textAlign: "center", fontSize: 20, marginTop: Platform.OS === "android" ? -10 : 0, textAlign: "center", marginBottom: 10, fontWeight: Platform.OS === "android" ? 800 : 600 }}>Report</AppText>

                        </View>
                    </View>
                    <View style={style.item}>
                        <View style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
                            <MaterialCommunityIcons
                                name={"account"}
                                size={80}
                                color={defaultStyles.colors.light}

                            />
                            <AppText style={{ color: "white", textAlign: "center", fontSize: 20, marginTop: Platform.OS === "android" ? -10 : 0, textAlign: "center", marginBottom: 10, fontWeight: Platform.OS === "android" ? 800 : 600 }}>My Profile</AppText>

                        </View>
                    </View>
                </View>
                <View style={style.menuContainerr}>
                    <View style={style.item}>
                        <View style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
                            <MaterialCommunityIcons
                                name={"bag-personal"}
                                size={80}
                                color={defaultStyles.colors.light}

                            />
                            <AppText style={{ color: "white", textAlign: "center", fontSize: 20, marginTop: Platform.OS === "android" ? -10 : 0, textAlign: "center", marginBottom: 10, fontWeight: Platform.OS === "android" ? 800 : 600 }}>My Shifts</AppText>

                        </View>
                    </View>
                    <View style={style.item}>
                        <View style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
                            <MaterialCommunityIcons
                                name={"file"}
                                size={80}
                                color={defaultStyles.colors.light}

                            />
                            <AppText style={{ color: "white", textAlign: "center", fontSize: 20, marginTop: Platform.OS === "android" ? -10 : 0, textAlign: "center", marginBottom: 10, fontWeight: Platform.OS === "android" ? 800 : 600 }}>User Tutorials</AppText>

                        </View>
                    </View>
                </View>

                {/* <View style={style.buttonsContainer}>

                <Button
                    color="primary"
                    title="Login"
                    onPress={() => navigation.navigate(routes.LOGIN)}
                />
                <Button
                    title="Register"
                    color="secondary"
                    onPress={() => navigation.navigate(routes.REGISTER)}
                />
            </View> */}
            </View>
        </MainScreen>

    )
}
const style = StyleSheet.create({
    menuContainer: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 10,
    },
    menuContainerr: {
        marginTop: -100,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 10,
    },
    item: {
        width: '46%', // is 50% of container width,
        height: 150,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    flexContainer: {
        flex: 0.5,
        gap: 0,
        marginVertical: 0,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    background: {
        marginTop: 30,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    buttonsContainer: {
        alignItems: "center",
        marginTop: 0,
        padding: 20,
        width: "100%",
    },
    logo: {
        //backgroundColor: "red",
        width: 150,
        height: 150,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
    tagline: {
        color: colors.white,
        fontSize: 25,
        fontWeight: "600",
        paddingVertical: 10,
    },
});
export default MenuScreen