import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Button = ({ action, label, color }) => {
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      margin: 2,
      backgroundColor: color || '#ddd',
    },
    text: {
        fontSize: 38,
        color: '#fff',
    },
  });
  
  return (
    <TouchableOpacity onPress={action} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
    )
}



export default Button;