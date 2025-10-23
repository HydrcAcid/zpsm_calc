/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Button from './components/button.jsx';
import Display from './components/display.jsx';
import { useState } from 'react';

function App() {
  enum Operator {
    NONE,
    ADD,
    SUB,
    MUL,
    DIV
  }

  const [evaluation, setEvaluation] = useState('5');
  const [l_operand, setL_operand] = useState(0);
  const [r_operand, setR_operand] = useState(0);
  const [operator, setOperator] = useState(Operator.NONE);
  const [decimalMode, setDecimalMode] = useState(false);

  function evaluate() {
    let result = l_operand;
    switch (operator) {
      case Operator.ADD:
        result += r_operand;
        break;
      case Operator.SUB:
        result -= r_operand;
        break;
      case Operator.MUL:
        result *= r_operand;
        break;
      case Operator.DIV:
        if (r_operand === 0) {
          setEvaluation("Cannot div by 0.");
          return;
        }
        result /= r_operand;
        break;
      default:
        result = r_operand;
        break;
    }

    setL_operand(result);
    setR_operand(0);
    setEvaluation(result.toString());
    setOperator(Operator.NONE);
    setDecimalMode(false);
  }

  function addDigit(digit: number) {
    if(!decimalMode) {
      const new_value = r_operand * 10 + digit;
      setR_operand(new_value);
      setEvaluation(new_value.toString());
    } else {
      const new_value = r_operand * 0.1 + digit;
      setR_operand(new_value);
      setEvaluation(new_value.toString());
    }
  }

  function clear() {
    setEvaluation('0');
    setR_operand(0);
    setL_operand(0);
    setOperator(Operator.NONE);
    setDecimalMode(false);
  }

  function processOperator(op: Operator) {
    if(r_operand !== 0) {
      evaluate();
    }
    setEvaluation(evaluation + " " + Operator[op]);
    setOperator(op);
  }

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <Display value={evaluation} />
      <View style={styles.button_container}>
        <View style={styles.button_row}>
          <Button action={() => clear()} label={"AC"} color={'#555'}/>
          <Button action={() => setOperator(Operator.DIV)} label={"÷"} color={'#ffa31a'}/>
        </View>
        <View style={styles.button_row}>
          <Button action={() => addDigit(7)} label={"7"} color={'#777'}/>
          <Button action={() => addDigit(8)} label={"8"} color={'#777'}/>
          <Button action={() => addDigit(9)} label={"9"} color={'#777'}/>
          <Button action={() => processOperator(Operator.MUL)} label={"X"} color={'#ffa31a'}/>
        </View>
        <View style={styles.button_row}>
          <Button action={() => addDigit(4)} label={"4"} color={'#777'}/>
          <Button action={() => addDigit(5)} label={"5"} color={'#777'}/>
          <Button action={() => addDigit(6)} label={"6"} color={'#777'}/>
          <Button action={() => processOperator(Operator.SUB)} label={"-"} color={'#ffa31a'}/>
        </View>
        <View style={styles.button_row}>
          <Button action={() => addDigit(1)} label={"1"} color={'#777'}/>
          <Button action={() => addDigit(2)} label={"2"} color={'#777'}/>
          <Button action={() => addDigit(3)} label={"3"} color={'#777'}/>
          <Button action={() => processOperator(Operator.ADD)} label={"+"} color={'#ffa31a'}/>
        </View>
        <View style={styles.button_row}>
          <Button action={() => addDigit(0)} label={"0"} color={'#777'}/>
          <Button action={() => setDecimalMode(true)} label={","} color={'#777'}/>
          <Button action={() => evaluate()} label={"="} color={'#ffa31a'}/>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  button_container: {
    flex: 5,
    backgroundColor: '#444',
  },
  button_row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default App;
