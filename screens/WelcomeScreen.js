import React from 'react'
import { StyleSheet, ImageBackground, View, Image } from "react-native";
import AppText from '../components/Text';
import Button from "../components/Button";
import routes from "../navigations/routes";
import colors from '../config/colors';
const WelcomeScreen = ({ navigation }) => {
    return (
        <View

            blurRadius={9}
            style={style.background}

        >


            <View style={{ margin: 0 }}>
                <Image source={require("../assets/logo_new.png")} resizeMode='contain' style={style.logo} />

            </View>
            <View style={style.buttonsContainer}>

                <Button
                    color="indigo"
                    title="Login"
                    onPress={() => navigation.navigate(routes.LOGIN)}
                />
                <Button
                    title="Register"
                    color="secondary"
                    onPress={() => navigation.navigate(routes.REGISTER)}
                />
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    flexContainer: {
        flex: 0.5,
        gap: 0,
        marginVertical: 0,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    background: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonsContainer: {
        alignItems: "center",
        marginTop: 0,
        padding: 20,
        width: "100%",
    },
    logo: {
        //width: 300,
        height: 100,
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
export default WelcomeScreen