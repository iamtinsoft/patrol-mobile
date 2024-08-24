import React from 'react';
import {
    StyleSheet, View, Text, Image, Dimensions,
} from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';

const { width } = Dimensions.get('window');

const DATA = [
    {
        coverImageUri: 'https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=600',
        cornerLabelColor: '#2ECC40',
        cornerLabelText: '10% Discount',
    },
    {
        coverImageUri: 'https://images.pexels.com/photos/668196/pexels-photo-668196.jpeg?auto=compress&cs=tinysrgb&w=600',
        cornerLabelColor: '#2ECC40',
        cornerLabelText: '50% Discount',
    },
    {
        coverImageUri: 'https://images.pexels.com/photos/7755677/pexels-photo-7755677.jpeg?auto=compress&cs=tinysrgb&w=600',
        cornerLabelColor: '#2ECC40',
        cornerLabelText: '75% Discount',
    },
    {
        coverImageUri: 'https://images.pexels.com/photos/696287/pexels-photo-696287.jpeg?auto=compress&cs=tinysrgb&w=600',
        cornerLabelColor: '#2ECC40',
        cornerLabelText: '20% Discount',
    },
];

const CustomCarousel = () => {
    const renderItem = data => (
        <View
            key={data.coverImageUri}
            style={styles.cardContainer}
        >
            <View
                style={styles.cardWrapper}
            >
                <Image
                    style={styles.card}
                    source={{ uri: data.coverImageUri }}
                />
                <View
                    style={[
                        styles.cornerLabel,
                        { backgroundColor: data.cornerLabelColor },
                    ]}
                >
                    <Text style={styles.cornerLabelText}>
                        {data.cornerLabelText}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                pagination={PaginationLight}
                renderItem={renderItem}
                data={DATA}
                loop
                autoplay
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
    },
    cardWrapper: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    card: {
        width: width * 0.9,
        height: width * 0.5,
    },
    cornerLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
    },
    cornerLabelText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        paddingBottom: 12,
    },
});

export default CustomCarousel;