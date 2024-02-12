import { ImageSourcePropType, StyleSheet } from 'react-native'
import React from 'react'

// Screens 
import Home from './Screens/Home'
import Welcome from './Screens/Welcome';
import Details from './Screens/Details';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Exercises from './Screens/Exercises';
type item = {
  bodyPart: string
  equipment: string
  gifUrl: string
  id: string
  name: string
  target: string
  secondaryMuscles: string[]
  instructions: string[]
}

export type RootStackParamList = {
  Home: undefined
  Welcome: undefined
  Details: {
    item: item
  }
  Exercises: {
    name: string
    image: ImageSourcePropType
    index: number
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Details' component={Details} options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationDuration: 2000
        }} />
        <Stack.Screen name='Exercises' component={Exercises} options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationDuration: 2000
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
