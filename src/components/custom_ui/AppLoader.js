import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Colors from "../../utils/Colors";

export const AppLoader = () => (
    <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.greyColor} />
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});