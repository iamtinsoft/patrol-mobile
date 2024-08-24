import React from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import AppText from '../Text'
import colors from '../../config/colors'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import authApi from "../../api/auth";
const NavHeader = () => {
    const { user, logOut, logIn } = useAuth();
    const confirmLogout = () =>
        Alert.alert('Are you sure you want to logout', 'Confirm', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => logOut() },
        ]);
    return (
        <View style={style.flexContainer}>
            <View style={{ padding: 5, width: "96%", height: 40 }}>
                <View style={style.menuContainer}>
                    <View style={style.itemOne}>
                        <MaterialCommunityIcons
                            name={"menu"}
                            size={30}
                            color={colors.light}
                        // onPress={() => confirmLogout()}


                        />

                    </View>
                    <View style={style.itemTwo}>
                        <Text style={style.textStyle1}>Search Items</Text>
                    </View>
                    <View style={style.itemThree}>
                        <MaterialCommunityIcons
                            name={"power"}
                            size={30}
                            color={colors.light}
                            onPress={() => confirmLogout()}


                        />
                    </View>
                </View>
            </View>
            {/* <Text style={style.textStyle}>Show Password??</Text> */}
        </View>
    )
}
const style = StyleSheet.create({
    flexContainer: {
        backgroundColor: colors.primary,
        paddingTop: 40,
        paddingBottom: 10,
        height: "auto",
        width: "100%",
        marginVertical: 0,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    textStyle: {
        fontSize: 15,
        color: "white"
    },
    textStyle1: {
        fontSize: 16,
        color: "black"
    },
    menuContainer: {
        //marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 10,
    },

    itemOne: {
        width: '18%', // is 50% of container width,
        height: 30,

        justifyContent: "center",
        alignItems: "center",
    },
    itemTwo: {
        width: '55%', // is 50% of container width,
        height: 30,
        paddingHorizontal: 5,
        backgroundColor: colors.light,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    itemThree: {
        width: '18%', // is 50% of container width,
        height: 30,
        // backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
    },

});
export default NavHeader