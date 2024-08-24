import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import Button from "../components/Button";
import Text from "./Text";
import colors from "../config/colors";

function CategoryCard({ title, subTitle, imageUrl, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    tint="light"
                    //preview={{ uri: thumbnailUrl }}
                    uri={imageUrl}
                />
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

            </View>

        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "45%",
        height: 200,
        borderRadius: 15,
        //backgroundColor: colors.white,
        marginVertical: 0,
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
        borderRadius: 15,
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

export default CategoryCard;
