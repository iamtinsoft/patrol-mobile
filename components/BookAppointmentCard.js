import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from "react-native";
import { Image } from "react-native-expo-image-cache";
import Button from "../components/Button";
import Text from "./Text";
import colors from "../config/colors";
import AppText from "./Text";

function BookAppointmentCard({ title, subTitle, imageUrl, status, appointmentDate, onPress, data }) {
    // const cancelAppointment = () =>
    //     Alert.alert('Are you sure you want to cancel', 'Your Appointment', [
    //         {
    //             text: 'No',
    //             onPress: () => console.log('Cancel Pressed'),
    //             style: 'cancel',
    //         },
    //         { text: 'Yes', onPress: () => console.log('OK Pressed') },
    //     ]);


    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View>
                <View style={styles.card}>
                    <Image
                        style={styles.image}
                        tint="light"
                        //preview={{ uri: thumbnailUrl }}
                        uri={imageUrl}
                    />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title} numberOfLines={2}>
                            {title}
                        </Text>
                        <Text style={styles.subTitle} numberOfLines={2}>
                            ${data.servicePrice}
                        </Text>
                        <Text style={styles.smallText} numberOfLines={2}>
                            {data.serviceName} Services
                        </Text>


                    </View>

                </View>
                <Button width="100%" title={"Book"} color={"primary"} onPress={onPress} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10
    },
    card: {
        padding: 10,
        height: 150,
        borderRadius: 15,
        backgroundColor: colors.white,
        marginVertical: 10,
        marginHorizontal: 10,
        overflow: "hidden",
        flexDirection: "row"
    },
    padded: {

        marginHorizontal: 10,

    },
    detailsContainer: {
        padding: 20,
        justifyContent: "center"
    },
    image: {
        borderRadius: 15,
        width: 150,
        height: 130,
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold",
    },
    title: {
        marginBottom: 7,
    },
    text: {
        textTransform: "uppercase",
        fontSize: 12,
        textAlign: "center"
    },
    smallText: {
        textTransform: "uppercase",
        fontSize: 13,
        // textAlign: "center"
    }
});

export default BookAppointmentCard;
