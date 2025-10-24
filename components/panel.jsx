import React from "react";
import { StyleSheet, View } from "react-native";

const Panel = ({ width, color }) => {
    const styles = StyleSheet.create({
        panel: {
            flex: width || 1,
            backgroundColor: color || '#444',
        },
    });
    return <View style={styles.panel} />;
};

export default Panel;