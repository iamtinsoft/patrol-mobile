import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";
//import { useFonts } from './../hooks/useFonts';
function AppText({ children, style, ...otherProps }) {
  // const fontsLoaded = useFonts();
  return (
    <Text style={[defaultStyles.text, style, { fontFamily: 'Inter_400Regular' }]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
