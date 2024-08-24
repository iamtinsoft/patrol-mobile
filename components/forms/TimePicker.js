import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import AppText from '../Text';
import AppButton from '../Button';
const TimePicker = ({ handleonDateChange, title = "Choose Time" }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        handleonDateChange(currentDate)
        //onChange(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <>
            <View style={styles.view}>
                {/* <AppText style={{ fontSize: 18, padding: 10 }}>Date Selected : {date.toISOString()}</AppText> */}
                <AppButton style={{ width: "50%", backgroundColor: "black" }} onPress={showTimepicker} title={title} />

            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}</>
    )
}
const styles = StyleSheet.create({
    view: {
        // flex: 1,
        height: "auto",
        flexDirection: "column"
    },
});
export default TimePicker