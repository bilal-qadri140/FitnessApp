import { Button, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";



type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>

const Welcome = ({ navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#222'}/>
      <Image
        style={styles.image}
        source={require('../assets/Images/welcome.jpg')}
      />
      <Animated.View entering={FadeInDown.delay(100).springify().mass(4)} style={styles.headingContainer}>
        <Text style={styles.heading}>Best  <Text style={{ color: '#f300a2' }}>Workouts</Text></Text>
        <Text style={styles.heading}> For You</Text>
      </Animated.View >
      <Animated.View entering={FadeInDown.delay(400).springify().mass(4)}>
        <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => { navigation.navigate('Home') }}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  headingContainer: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30,
    // backgroundColor:'#fff'
  },
  heading: {
    fontSize: 38,
    color: '#fff',
    fontWeight: '900',
    textAlign: "center"
  },
  button: {
    width: responsiveWidth(70),
    height: responsiveWidth(15),
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#f300a2',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})


