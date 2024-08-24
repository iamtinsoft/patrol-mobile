import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Modal, Pressable } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ResponseModal = ({ title, subTitle, status }) => {
    const [modalVisible, setModalVisible] = useState(status);
    return (
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
                    <AppText style={{ fontSize: 20, marginVertical: 10 }}>{title}</AppText>
                    <MaterialCommunityIcons
                        name={"check-circle"}
                        size={40}
                        color={"green"}
                    //style={styles.icon}
                    />
                    <AppText style={{ fontSize: 16, marginBottom: 10, textAlign: "center" }}>{subTitle}</AppText>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
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
export default ResponseModal