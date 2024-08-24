import React, { useEffect } from "react";
import { FlatList, View, Text, StyleSheet, ScrollView } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import ServiceCard from "../components/ServiceCard";
import colors from "../config/colors";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import servicesApi from "../api/services";
import { LinearGradient } from 'expo-linear-gradient';
import CarouselCards from './../components/CarouselCards'
import CategoryCard from "../components/CategoryCard";
import { categoryData } from "../json/fakeData";
import CustomCarousel from "../components/CustomCarousel";
function HomeScreen({ navigation }) {
    const preData = [
        {
            id: 1,
            imageUrl: "https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Revamp your look with our expert touch",
            subTitle: "Revamp your look with our expert touch"
        }, {
            id: 2,
            imageUrl: "https://images.pexels.com/photos/668196/pexels-photo-668196.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Revamp your look with our expert touch",
            subTitle: "Revamp your look with our expert touch"
        }, {
            id: 3,
            imageUrl: "https://images.pexels.com/photos/7755677/pexels-photo-7755677.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Revamp your look with our expert touch",
            subTitle: "Revamp your look with our expert touch"
        }, {
            id: 4,
            imageUrl: "https://images.pexels.com/photos/696287/pexels-photo-696287.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Revamp your look with our expert touch",
            subTitle: "Revamp your look with our expert touch"
        }
    ]
    const getServicesApi = useApi(servicesApi.getServices);
    useEffect(() => {
        getServicesApi.request();
    }, []);

    return (
        <>

            <Screen style={styles.screen}>
                {/* {getListingsApi.error && (
                    <>
                        <AppText>Couldn't retrieve the listings.</AppText>
                        <Button title="Retry" onPress={getListingsApi.request} />
                    </>
                )} */}
                <AppText style={[styles.text]}>Afrobeauty-on-wheels</AppText>
                <AppText style={styles.smallText}>Transform Your Look!
                    Welcome to Afro beauty on wheels! Where Style Meets Expertise. Discover the Perfect Look Today!</AppText>

                <ScrollView style={{ marginTop: 10 }}>
                    <CustomCarousel />
                    <AppText style={[styles.mediumText, { marginVertical: 20 }]}>Browse Services by Categories</AppText>
                    <ActivityIndicator visible={getServicesApi.loading} />
                    {getServicesApi.error && (
                        <>
                            <AppText>Couldn't retrieve the listings.</AppText>
                            <Button title="Retry" onPress={getServicesApi.request} />
                        </>
                    )}
                    <FlatList
                        data={getServicesApi.data}
                        renderItem={({ item }) => (
                            <CategoryCard

                                title={item.serviceName}
                                subTitle={item.subTitle}
                                imageUrl={item.imageUrl}
                                onPress={() => navigation.navigate(routes.SERVICEPROVIDERS, item)}
                            />
                        )}
                        keyExtractor={item => item.id}
                        numColumns={2} />
                    <AppText style={[styles.mediumText, { marginVertical: 20 }]}>Recommeded Services</AppText>
                    <FlatList
                        data={getServicesApi.data.filter((x) => x.id < 14)}
                        renderItem={({ item }) => (
                            <CategoryCard

                                title={item.serviceName}
                                subTitle={item.subTitle}
                                imageUrl={item.imageUrl}
                                onPress={() => navigation.navigate(routes.SERVICEPROVIDERS, item)}
                            />
                        )}
                        keyExtractor={item => item.id}
                        numColumns={2} />
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
        fontSize: 30,
        textAlign: "center"
    },
    smallText: {
        fontWeight: "500",
        fontSize: 14,
        textAlign: "center"
    },
    mediumText: {
        fontWeight: "500",
        fontSize: 18,
        textAlign: "left",
        marginVertical: 10
    },
    screen: {
        padding: 10,
        backgroundColor: colors.light,
    },
});

export default HomeScreen;
