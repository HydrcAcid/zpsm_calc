import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Button = ({ value, color, action, width = 1 }) => {
  const styles = StyleSheet.create({
    button: {
      flex: width,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color || '#ddd',
    },
    text: {
        fontSize: 38,
        color: '#fff',
    },
  });
  
  return (
    <TouchableOpacity onPress={action} style={styles.button}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  )
}



export default Button;