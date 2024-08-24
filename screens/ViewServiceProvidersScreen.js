import React, { useEffect, useState } from "react";
import serviceProviderApi from "../api/serviceProviders";
import { FlatList, View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Modal, Pressable } from "react-native";
import Button from "../components/Button";
import ServiceCard from "../components/ServiceCard";
import colors from "../config/colors";
import providersApi from "../api/serviceProviders";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import { LinearGradient } from 'expo-linear-gradient';
import CarouselCards from './../components/CarouselCards'
import BookAppointmentCard from "../components/BookAppointmentCard";
import DatePicker from "../components/forms/DatePicker";
import { BookingData } from "../json/fakeData";
import useAuth from "../auth/useAuth";
import appointmentApi from "../api/appointments";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TimePicker from "../components/forms/TimePicker";
const ViewServiceProvidersScreen = (props) => {
    const auth = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const getServicesProviderApi = useApi(serviceProviderApi.getProviderServices);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        //getServicesProviderApi.request(props.route.params.id);
    }
    const handleTimeChange = (date) => {
        setSelectedTime(date);
        console.log(date);
        getServicesProviderApi.request(props.route.params.id);
    }
    const [loginFailed, setLoginFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const bookAppointment = (item) => {
        let dataObject = {
            userId: auth.user.id,
            serviceTypeId: props.route.params.id,
            providerId: item.id,
            allottedTimeId: selectedTime,
            allottedDate: selectedDate,
        };

        Alert.alert('Are you sure you want to book', 'Your Appointment', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: async () => {
                    const result = await appointmentApi.addBooking(dataObject);
                    console.log(result);
                    if (!result.ok) return setLoginFailed(true);
                    setModalVisible(true);
                    //setLoginFailed(false);
                }
            },
        ]);
    }
    // useEffect(() => {
    //     getServicesProviderApi.request(props.route.params.id);
    // }, []);
    return (
        <>


            <Screen style={styles.screen}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <AppText style={{ fontSize: 20, marginVertical: 10 }}>Response</AppText>
                            <MaterialCommunityIcons
                                name={"check-circle"}
                                size={40}
                                color={"green"}
                            //style={styles.icon}
                            />
                            <AppText style={{ fontSize: 16, marginBottom: 10, textAlign: "center" }}>Your Service has been Booked</AppText>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <DatePicker handleonDateChange={(e) => handleDateChange(e)} />
                <TimePicker handleonDateChange={(e) => handleTimeChange(e)} />
                {getServicesProviderApi.error && (
                    <>
                        <AppText>Couldn't retrieve the Services.</AppText>
                        <Button title="Retry" onPress={getServicesProviderApi.request} />
                    </>
                )}
                {!getServicesProviderApi.error && !getServicesProviderApi.data && getServicesProviderApi.loading && (
                    <>
                        <ActivityIndicator size={"large"} visible={getServicesProviderApi.loading} />
                    </>
                )}


                <FlatList
                    data={getServicesProviderApi.data}
                    keyExtractor={(listing) => listing.id.toString()}
                    renderItem={({ item }) => (
                        <BookAppointmentCard
                            title={item.name}
                            subTitle={item.serviceName}
                            status={item.status}
                            appointmentDate={item.appointmentDate}
                            appointmentTime={item.appointmentTime}
                            imageUrl={item.avatar}
                            data={props.route.params}
                            onPress={() => bookAppointment(item)}
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
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        width: 300,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        //padding: 10,
        elevation: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {

        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
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
        justifyContent: "flex-start",
        paddingTop: 3,
        paddingHorizontal: 5,
        backgroundColor: colors.light,
    },
});
export default ViewServiceProvidersScreen