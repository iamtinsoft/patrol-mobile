import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "../Text";
import colors from "../../config/colors";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <View style={styles.container}>
    <Text style={styles.error}>{error}</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: { padding: 10, textAlign: "center", backgroundColor: colors.danger, borderRadius: 8 },
  error: { color: "white" },
});

export default ErrorMessage;
