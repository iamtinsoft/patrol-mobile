import React, { useRef } from 'react';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { View, TouchableOpacity, Text } from 'react-native';

export function PaystackPayment({ autostart, handleSuccess, handleCancel, email, amount }) {
    // const paystackWebViewRef = useRef < paystackProps.PayStackRef > (any);

    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey="pk_test_8eff32fe8808697d70f18168d0c1715836f46ec4"
                amount={amount}
                billingEmail={email}
                activityIndicatorColor="green"
                onCancel={(e) => {
                    handleCancel();
                    // handle response here
                }}
                onSuccess={(res) => {
                    handleSuccess();
                    // handle response here
                }}
                autoStart={true}
            />
        </View>
    );
}