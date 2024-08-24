import { useFonts } from 'expo-font';

const useFonts = () => {
    const [fontsLoaded] = useFonts({
        'Satoshi': require('../assets/fonts/Satoshi-Variable.ttf'),
    });
    return fontsLoaded;
};