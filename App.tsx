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
    DIV,
    PERCENT,
  }

  function toFixedIfNecessary(value: Number, dp: number) {
    return +value.toFixed(dp);
  }

  const [displayValue, setDisplayValue] = useState('0');
  const [displayOperation, setDisplayOperation] = useState('');
  const [l_operand, setL_operand] = useState(0);
  const [r_operand, setR_operand] = useState(0);
  const [evaluation, setEvaluation] = useState(0);
  const [operator, setOperator] = useState(Operator.NONE);``
  const [decimalMode, setDecimalMode] = useState(false);
  const [decimalPos, setDecimalPos] = useState(1);

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
          clear();
          setDisplayValue("Cannot div by 0.");
          return 0;
        }
        result /= r_operand;
        break;
      case Operator.PERCENT:
        result = (l_operand / 100) * r_operand;
        break;
      default:
        result = r_operand;
        break;
    }

    setL_operand(result); 
    setR_operand(0);

    setEvaluation(result);

    setDisplayValue(toFixedIfNecessary(result, 8).toString());
    setDisplayOperation('');

    setOperator(Operator.NONE);
    setDecimalMode(false);
    setDecimalPos(1);

    return result;
  }

  function addDigit(digit: number) {
    if(!decimalMode) {
      const new_value = r_operand * 10 + digit;
      setR_operand(new_value);
      setDisplayValue(new_value.toString());
    } else {
      const new_value = r_operand + Math.pow(0.1, decimalPos) * digit;
      setDecimalPos(decimalPos + 1);
      setR_operand(new_value);
      setDisplayValue(new_value.toString());
    }
  }

  function clear() {
    setDisplayValue('0');
    setDisplayOperation('');

    setEvaluation(0);
    setR_operand(0);
    setL_operand(0);
    setOperator(Operator.NONE);
    setDecimalMode(false);
    setDecimalPos(1);
  }

  function toggleSign() {
    let swapped = -r_operand;
    setR_operand(swapped);
    setDisplayValue(toFixedIfNecessary(swapped, 8).toString());
  }

  function processOperator(op: Operator, char: string) {    
    let gt = evaluation;
    if(r_operand !== 0) {
      gt = evaluate();
    }

    setDisplayOperation(toFixedIfNecessary(gt, 10) + " " + char);
    setOperator(op);
  }

  const buttonLayoutBase = [
    [
        {
            value: 'AC',
            color: '#555',
            action: () => { clear(); }
        },
        {
            value: '+/-',
            color: '#555',
            action: () => { toggleSign(); }
        },
        {
            value: '%',
            color: '#555',
            action: () => { processOperator(Operator.PERCENT, '%'); }
        },
        {
            value: '÷',
            color: '#ffa31a',
            action: () => { processOperator(Operator.DIV, '÷'); }  
        },
    ],
    [
        {
            value: '7',
            color: '#777',
            action: () => { addDigit(7); }
        },
        {
            value: '8',
            color: '#777',
            action: () => { addDigit(8); }
        },
        {
            value: '9',
            color: '#777',
            action: () => { addDigit(9); }
        },
        {
            value: 'x',
            color: '#ffa31a',
            action: () => { processOperator(Operator.MUL, 'x'); }
        },
    ],
    [
        {
            value: '4',
            color: '#777',
            action: () => { addDigit(4); }
        },
        {
            value: '5',
            color: '#777',
            action: () => { addDigit(5); }
        },
        {
            value: '6',
            color: '#777',
            action: () => { addDigit(6); }
        },
        {
            value: '-',
            color: '#ffa31a',
            action: () => { processOperator(Operator.SUB, '-'); }
        },
    ],
    [
        {
            value: '1',
            color: '#777',
            action: () => { addDigit(1); }
        },
        {
            value: '2',
            color: '#777',
            action: () => { addDigit(2); }
        },
        {
            value: '3',
            color: '#777',
            action: () => { addDigit(3); }
        },
        {
            value: '+',
            color: '#ffa31a',
            action: () => { processOperator(Operator.ADD, '+'); }
        },
    ],
    [
        {
            width: 2,
            value: '0',
            color: '#777',
            action: () => { addDigit(0); }
        },
        {
            value: ',',
            color: '#777',
            action: () => { setDecimalMode(true); }
        },
        {
            value: '=',
            color: '#ffa31a',
            action: () => { evaluate(); }
        },
    ]
  ];

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <Display value={displayValue} operation={displayOperation} />
      <View style={styles.button_container}>
        {buttonLayoutBase.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.button_row}>
            {row.map((button, buttonIdx) => (
              <Button 
                key={buttonIdx} 
                value={button.value} 
                color={button.color} 
                action={button.action}
                width={button?.width}>
                </Button>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  button_container: {
    flex: 5,
    backgroundColor: '#444',
    gap: 2,
  },
  button_row: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 2,
  },
});

export default App;
