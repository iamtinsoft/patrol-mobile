import React, { useState } from "react";
import { StyleSheet, Platform, Image, ScrollView, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import routes from "../navigations/routes";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import AppText from "../components/Text";
import FormImagePicker from "../components/forms/FormImagePicker";
//import AvatarUploader from "../components/avatarUploader";

const validationSchema = Yup.object().shape({

    feedback: Yup.string().required().label("Feedback"),

});

function FeedbackScreen({ navigation }) {
    const auth = useAuth();
    const { user, logOut, logIn } = useAuth();
    //console.log(user);
    const [loginFailed, setLoginFailed] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const handleSubmit = async (data) => {
        //console.log(data);
        // setProgress(0);
        // setUploadVisible(true);
        // const uploadResult = await authApi.upload(
        //     { ...data },
        //     (progress) => setProgress(progress)
        // );
        // console.log(uploadResult.data);
        // if (!uploadResult.ok) {
        //     setUploadVisible(false);
        //     return alert("Could not Update Photo");
        // }

        // setIsLoading(true);
        // setLoginFailed(false);

        // data.avatarUrl = uploadResult.data.path;
        // const result = await authApi.updateProfile(data);

        // setIsLoading(false);
        // if (!result.ok) return setLoginFailed(true);
        setIsSuccessful(true);
        // setUploadVisible(false);
        // logIn(result.data);
    };

    return (
        <Screen style={styles.container}>
            {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
            <ScrollView>
                <AppText style={{ fontSize: 30, marginTop: Platform.OS === "android" ? -5 : 0, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Add your feed back</AppText>

                <Form
                    initialValues={{ feedback: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >

                    <FormField
                        label="Feedback"
                        isLabelVisible={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="feedback"
                        placeholder="Add Feedback"
                        //textContentType="birthdate"
                        multiline={true}
                        numberOfLines={4}
                        textAlign={"Vertical"}
                    />


                    {isLoading && <ActivityIndicator />}
                    {isSuccessful && <AppText style={{ textAlign: "center", fontWeight: "bold", fontSize: 22, color: "green" }}>Feedback Sent  Successfully</AppText>}
                    <SubmitButton title="Save" color={"secondary"} />
                </Form>
            </ScrollView>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 200,
        height: 80,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
    },
});

export default FeedbackScreen;
