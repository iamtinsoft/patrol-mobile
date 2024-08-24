import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from "react-native";
import { Image } from "react-native-expo-image-cache";
import Button from "../components/Button";
import Text from "./Text";
import colors from "../config/colors";
import AppText from "./Text";
import DatePicker from "../components/forms/DatePicker";
import { splitDate, splitDateTime } from "../utility/dateTimeHelper";
import { PaystackPayment } from "./PaystackPayment";
//import { PayWithFlutterwave } from 'flutterwave-react-native';
// import PaystackPayment from "../components/PaystackPayment";
//import { FlutterwaveButton } from 'flutterwave-react-native';
function BookingCard({ id, title, subTitle, imageUrl, status, appointmentDate, appointmentTime, onCancelPress, onReschedulePress, onPay, onFeedBack, price }) {
    const [payment, setPayment] = useState(false);
    const auth = useAuth();
    const handleDateChange = (date) => {
        rescheduleAppointment(date)
        //setSelectedDate(date);
        //getServicesProviderApi.request(props.route.params.id);
    }

    const confirmAppointment = () => {
        onPay(id);
    }
    // Alert.alert('Are you sure you want to pay for this service', 'Your Appointment', [
    //     {
    //         text: 'No',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel',
    //     },
    //     { text: 'Yes', onPress: () => onPay(id) },
    // ]);

    const cancelAppointment = () =>
        Alert.alert('Are you sure you want to cancel', 'Your Appointment', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => onCancelPress(id) },
        ]);

    const rescheduleAppointment = (date) =>
        Alert.alert('Are you sure you want to reschedule', 'Your Appointment', [
            {
                text: 'No',
                onPress: () => console.log('Cancel jj Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => onReschedulePress(date, id) },
        ]);
    // const handleOnRedirect = () => {
    //     console.log('sadi')
    // }

    // const generateRef = (length) => {
    //     var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    //     var b = [];
    //     for (var i = 0; i < length; i++) {
    //         var j = (Math.random() * (a.length - 1)).toFixed(0);
    //         b[i] = a[j];
    //     }
    //     return b.join("");
    // }
    return (
        <TouchableWithoutFeedback>
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
                            {subTitle}
                        </Text>
                        <View>
                            <Text style={styles.smallText} numberOfLines={2}>
                                {splitDate(appointmentDate)}
                            </Text>
                            <Text style={styles.smallText} numberOfLines={2}>
                                {/* {appointmentTime} */}
                                {splitDateTime(appointmentTime)}
                            </Text>
                        </View>
                        {status == 1 ? <View style={{ backgroundColor: "yellow", padding: 8, width: 150 }}>
                            <AppText style={styles.text}>Awaiting Payment</AppText>
                        </View> : <View style={{ backgroundColor: "green", padding: 8, width: 150 }}>
                            <AppText style={styles.text}>Confirmed</AppText>
                        </View>}
                    </View>

                </View>
                <View style={styles.viewContainer}>


                    {status == 1 && <Button title={"Cancel"} color={"danger"} width="30%" onPress={cancelAppointment} />}
                    {status == 1 && <DatePicker title="Reschedule" handleonDateChange={(e) => handleDateChange(e)} />}
                    {status == 1 && <Button title={"Check out"} color={"medium"} width="30%" onPress={() => setPayment(true)} />}
                    {payment && <PaystackPayment autostart={payment} amount={price} email={auth.user.email} handleCancel={console.log("Cancelled")} handleSuccess={confirmAppointment} />}
                    {status == 2 && <Button title={"Feedback"} color={"secondary"} width="100%" onPress={() => onFeedBack(id)} />}
                    {/* {status == 2 && <Button width="auto" title={"Reschedule"} color={"primary"} onPress={rescheduleAppointment} />} */}
                    {/* <Button title={"Cancel"} color={"danger"} width="auto" onPress={cancelAppointment} /> */}
                </View>
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
        marginBottom: 5
        // textAlign: "center"
    }
});

export default BookingCard;
