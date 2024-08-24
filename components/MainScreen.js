import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";
import NavHeader from "./header/NavHeader";

function MainScreen({ children, style }) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View style={[styles.view, style]}>
                <View>
                    <NavHeader />
                </View>
                {children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        // paddingTop: Constants.statusBarHeight,
        paddingTop: 0,
        paddingHorizontal: 0,
        flex: 1,
    },
    view: {
        flex: 1,
    },
});

export default MainScreen;
