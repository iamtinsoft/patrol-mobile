import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, ScrollView } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import ServiceCard from "../components/ServiceCard";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import { LinearGradient } from 'expo-linear-gradient';
import CarouselCards from './../components/CarouselCards'
import BookingCard from "../components/BookingCard";
import { BookingData } from "../json/fakeData";
import appointmentApi from "../api/appointments";
import useAuth from "../auth/useAuth";
import ResponseModal from "../components/modals/ResponseModal";
function BookingsScreen({ navigation }) {
    const [payment, setPayment] = useState(false);
    //const auth = useAuth();
    const auth = useAuth();
    const getListingsApi = useApi(appointmentApi.getBookings);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    useEffect(() => {
        getListingsApi.request(auth.user.id);
    }, []);
    const cancelAppointment = async (item) => {
        const result = await appointmentApi.deleteBooking(item);
        console.log(result);
        if (!result.ok) return setErrorModalVisible(true);
        setSuccessModalVisible(true);
        getListingsApi.request(auth.user.id);
    }
    const handleFeedBack = async (item) => {
        navigation.navigate(routes.SERVICEPROVIDERS, item)
        // const result = await appointmentApi.deleteBooking(item);
        // console.log(result);
        // if (!result.ok) return setErrorModalVisible(true);
        // setSuccessModalVisible(true);
        // getListingsApi.request(auth.user.id);
    }
    const rescheduleAppointment = async (item, d) => {

        let data = {
            id: d,
            date: item
        }
        // console.log(data);
        const result = await appointmentApi.rescheduleBooking(data);
        console.log(result);
        if (!result.ok) return setErrorModalVisible(true);
        setSuccessModalVisible(true);
        getListingsApi.request(auth.user.id);
    }

    const updateAppointment = async (d) => {
        let data = {
            id: d
        }
        const result = await appointmentApi.payBooking(data);
        console.log(result);
        if (!result.ok) return setErrorModalVisible(true);
        setSuccessModalVisible(true);
        getListingsApi.request(auth.user.id);
    }
    return (
        <>
            <Screen style={styles.screen}>
                {getListingsApi.error && (
                    <>
                        <AppText>Couldn't retrieve the listings.</AppText>
                        <Button title="Retry" onPress={getListingsApi.request} />
                    </>
                )}

                {!getListingsApi.error && getListingsApi.data.length == 0 && (
                    <>
                        <AppText style={{ textAlign: "center" }}>There are no bookings for you.</AppText>
                        <Button title="Retry" onPress={() => getListingsApi.request(auth.user.id)} />
                    </>
                )}
                {payment && <PaystackPayment autostart={payment} amount={price} email={auth.user.email} handleCancel={console.log("Cancelled")} handleSuccess={confirmAppointment} />}
                <ResponseModal title={"An Error has occurred"} subTitle={"Record could not be deleted"} status={errorModalVisible} />
                <ResponseModal title={"Success"} subTitle={"Record deleted successfully"} status={successModalVisible} />
                <FlatList
                    refreshing={getListingsApi.loading}
                    onRefresh={() => getListingsApi.request(auth.user.id)}
                    data={getListingsApi.data}
                    keyExtractor={(listing) => listing.id.toString()}
                    renderItem={({ item }) => (
                        <BookingCard
                            id={item.id}
                            title={item.name}
                            subTitle={item.serviceName}
                            status={item.status}
                            appointmentDate={item.appointmentDate}
                            appointmentTime={item.appointmentTime}
                            imageUrl={item.avatarUrl}
                            onCancelPress={(item) => cancelAppointment(item)}
                            onReschedulePress={(item, d) => rescheduleAppointment(item, d)}
                            onPay={(d) => updateAppointment(d)}
                            onFeedBack={(d) => handleFeedBack(d)}
                            price={item.servicePrice}
                        //thumbnailUrl={item.images[0].thumbnailUrl}
                        />
                    )}
                />
            </Screen>
            {/* <LinearGradient
               
                colors={[colors.secondary, 'yellow', colors.secondary]}
                style={styles.container}>
               
               
            </LinearGradient> */}

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'orange',
    },
    text: {
        fontWeight: "500",
        fontSize: 35,
        textAlign: "center"
    },
    smallText: {
        fontWeight: "500",
        fontSize: 14,
        textAlign: "center"
    },
    screen: {
        padding: 10,
        backgroundColor: colors.light,
    },
});

export default BookingsScreen;
