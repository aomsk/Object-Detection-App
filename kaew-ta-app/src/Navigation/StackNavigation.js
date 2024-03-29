import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import screens
import HomeScreen from '../Screens/HomeScreen';
import ObstructionDetectScreen from '../Screens/ObstructionDetectScreen';
import ObjectDetectScreen from '../Screens/ObjectDetectScreen';
import MoneyDetectScreen from '../Screens/MoneyDetectScreen';


const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#FB923C'
        }
      }}>
        {/* <Stack.Navigator> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Obstruction" component={ObstructionDetectScreen} />
        <Stack.Screen name="Object" component={ObjectDetectScreen} />
        <Stack.Screen name="Money" component={MoneyDetectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation
