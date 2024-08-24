// import 'react-native-gesture-handler';
// import React, { useState, useEffect, useCallback } from "react";
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthNavigator from './navigations/AuthNavigator';
// import navigationTheme from "./navigations/navigationTheme";
// import { navigationRef } from "./navigations/rootNavigation";
// import authStorage from "./auth/storage";
// import AppNavigator from "./navigations/AppNavigator";
// import { useFonts } from 'expo-font';
// //import OfflineNotice from "./app/components/OfflineNotice";
// //import AuthNavigator from "./app/navigation/AuthNavigator";
// import AuthContext from "./auth/context";
// import AppLoading from 'expo-app-loading';
// import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';
// SplashScreen.preventAutoHideAsync();
// export default function App() {
//   const [user, setUser] = useState();
//   const [appIsReady, setAppIsReady] = useState(false);
//   const [loaded, error] = useFonts({
//     'Inter': require('./assets/fonts/Inter-VariableFont_slnt,wght.ttf'),
//   });
//   const restoreUser = async () => {
//     const user = await authStorage.getUser();
//     console.log("called users", user);
//     if (user) setUser(user);
//   };
//   useEffect(() => {
//     async function prepare() {
//       try {
//         await Font.loadAsync({
//           'Inter-Black': require('./assets/fonts/Inter-VariableFont_slnt,wght.ttf'),
//         });
//         // Pre-load fonts, make any API calls you need to do here
//         // await Font.loadAsync(Entypo.font);
//         // Artificially delay for two seconds to simulate a slow loading
//         // experience. Please remove this if you copy and paste the code!
//         await new Promise(resolve => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         // Tell the application to render
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       // This tells the splash screen to hide immediately! If we call this after
//       // `setAppIsReady`, then we may see a blank screen while the app is
//       // loading its initial state and rendering its first pixels. So instead,
//       // we hide the splash screen once we know the root view has already
//       // performed layout.
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     //rsetAppIsReady(true);
//     //return null;
//     return <AppLoading startAsync={restoreUser} onFinish={() => setAppIsReady(true)} onError={console.warn} />;
//   }
//   // if (!isReady)
//   //   return (
//   //     <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} onError={console.warn} />
//   //   );
//   return <AuthContext.Provider value={{ user, setUser }}>
//     <NavigationContainer ref={navigationRef} theme={navigationTheme}>
//       {user ? <AppNavigator /> : <AuthNavigator />}
//     </NavigationContainer>
//     {/* <OfflineNotice /> */}
//   </AuthContext.Provider>
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useContext, useState, useEffect } from "react";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from '@expo-google-fonts/inter';

import { useFonts } from 'expo-font';
import AuthContext from "./auth/context";
SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources
import authStorage from "./auth/storage";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigations/AuthNavigator';
import navigationTheme from "./navigations/navigationTheme";
import { navigationRef } from "./navigations/rootNavigation";
import AppNavigator from "./navigations/AppNavigator";
function App() {

  const [user, setUser] = useState();
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    console.log("called users", user);
    if (user) setUser(user);
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await restoreUser()
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={onLayoutRootView}
      >
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App