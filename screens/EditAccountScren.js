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
    id: Yup.string().required().label("User Id"),
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    phoneNo: Yup.string().required().label("PhoneNo"),
    bio: Yup.string().required().label("Bio"),
    images: Yup.array().min(1, "Please select at least one image."),

});

function EditAccountScreen({ navigation }) {
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
        setProgress(0);
        setUploadVisible(true);
        const uploadResult = await authApi.upload(
            { ...data },
            (progress) => setProgress(progress)
        );
        console.log(uploadResult.data);
        if (!uploadResult.ok) {
            setUploadVisible(false);
            return alert("Could not Update Photo");
        }

        setIsLoading(true);
        setLoginFailed(false);

        data.avatarUrl = uploadResult.data.path;
        const result = await authApi.updateProfile(data);

        setIsLoading(false);
        if (!result.ok) return setLoginFailed(true);
        setIsSuccessful(true);
        setUploadVisible(false);
        logIn(result.data);
    };

    return (
        <Screen style={styles.container}>
            {/* <Image style={styles.logo} source={require("../assets/logo.png")} /> */}
            <ScrollView>
                <AppText style={{ fontSize: 30, marginTop: Platform.OS === "android" ? -5 : 0, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Update your Profile</AppText>
                <UploadScreen
                    onDone={() => setUploadVisible(false)}
                    progress={progress}
                    visible={uploadVisible}
                />
                <Form
                    initialValues={{ id: user.id, firstName: user.firstName, lastName: user.lastName, phoneNo: user.phoneNo, bio: user.bio, images: [] }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage
                        error="Invalid email and/or password."
                        visible={loginFailed}
                    />
                    {/* <AvatarUploader /> */}
                    <FormImagePicker name="images" />
                    <FormField
                        label="FirstName"
                        isLabelVisible={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="firstName"
                        placeholder="Enter FirstName"
                    // textContentType="emailAddress"
                    />
                    <FormField
                        label="LastName"
                        isLabelVisible={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="lastName"
                        placeholder="Enter LastName"
                    // textContentType="emailAddress"
                    />

                    <FormField
                        label="Phone Number"
                        isLabelVisible={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="phoneNo"
                        placeholder="Enter Phone Number"
                    // textContentType="emailAddress"
                    />
                    {/* <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="dob"
                        placeholder="Enter Date of Birth"
                        textContentType="birthdate"
                    /> */}

                    <FormField
                        label="Bio"
                        isLabelVisible={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        //icon="email"
                        //keyboardType="email-address"
                        name="bio"
                        placeholder="Update your Bio"
                        //textContentType="birthdate"
                        multiline={true}
                        numberOfLines={4}
                        textAlign={"Vertical"}
                    />


                    {isLoading && <ActivityIndicator />}
                    {isSuccessful && <AppText style={{ textAlign: "center", fontWeight: "bold", fontSize: 22, color: "green" }}>Profile Updated Successfully</AppText>}
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

export default EditAccountScreen;
