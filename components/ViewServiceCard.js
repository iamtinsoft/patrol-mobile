import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import Button from "../components/Button";
import Text from "./Text";
import colors from "../config/colors";

function ViewServiceCard({ title, subTitle, imageUrl, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    tint="light"
                    //preview={{ uri: thumbnailUrl }}
                    uri={imageUrl}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    <Text style={styles.subTitle} numberOfLines={2}>
                        {subTitle}
                    </Text>
                </View>
                <View style={styles.padded}>
                    <Button title={"Book Now"} color={"secondary"} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 300,
        borderRadius: 15,
        backgroundColor: colors.white,
        marginVertical: 20,
        marginHorizontal: 10,
        overflow: "hidden",
    },
    padded: {

        marginHorizontal: 10,

    },
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 150,
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold",
    },
    title: {
        marginBottom: 7,
    },
});

export default ViewServiceCard;
