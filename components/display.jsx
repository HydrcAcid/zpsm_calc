import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Display = ({ value, operation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.small_text}>{operation}</Text>
        <Text style={styles.text}>{value}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        backgroundColor: '#444',
    },
    text: {
        fontSize: 52,
        color: '#fff',
    },
    small_text: {
        color: '#fff',
    }
});

export default Display;