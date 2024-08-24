import React, { useEffect } from "react";
import { FlatList, View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

//import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import ServiceCard from "../components/ServiceCard";
import colors from "../config/colors";
import providersApi from "../api/providers";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import { LinearGradient } from 'expo-linear-gradient';
import CarouselCards from './../components/CarouselCards'
import BookingCard from "../components/BookingCard";
import { BookingData } from "../json/fakeData";
function ServiceProvider(props) {
    const getrovidersApi = useApi(providersApi.getProviders(props.route.params.id));

    useEffect(() => {
        getProvidersApi.request();
        console.log(getprovidersApi);
    }, []);

    return (
        <>
            <AppText>{getprovidersApi.data.length}</AppText>
            <ActivityIndicator size={"large"} visible={getprovidersApi.loading} />
            <Screen style={styles.screen}>
                {getprovidersApi.error && (
                    <>
                        <AppText>Couldn't retrieve the Services.</AppText>
                        <Button title="Retry" onPress={getprovidersApi.request} />
                    </>
                )}


                <ScrollView>
                    <FlatList
                        data={getprovidersApi.data}
                        keyExtractor={(listing) => listing.id.toString()}
                        renderItem={({ item }) => (
                            <BookingCard
                                title={item.name}
                                subTitle={item.serviceName}
                                status={item.status}
                                appointmentDate={item.appointmentDate}
                                imageUrl={item.avatar}
                            //onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                            //thumbnailUrl={item.images[0].thumbnailUrl}
                            />
                        )}
                    />



                </ScrollView>
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

export default ServiceProvider;
