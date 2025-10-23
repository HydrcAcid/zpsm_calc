import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Display = ({ value }) => {
  return (
    <View style={styles.container}>
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
        fontSize: 72,
        color: '#fff',
    },
});

export default Display;