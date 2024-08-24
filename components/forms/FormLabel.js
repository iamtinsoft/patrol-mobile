import React from "react";
import { StyleSheet, View, Text } from "react-native";

import colors from "../../config/colors";

function FormLabel({ label, visible }) {
    if (!visible) return null;

    return <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: { padding: 5, textAlign: "left" },
    label: { color: colors.black, fontFamily: "Inter_600SemiBold" },
});

export default FormLabel;
