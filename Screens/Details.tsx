import { Image, ScrollView, StyleSheet, Text, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
// Exercises Details data
import Neck from '../Constants/Neck'
import Chest from '../Constants/Chest'
import Cardio from '../Constants/Cardio'
import LowerArms from '../Constants/LowerArms'
import LowerLegs from '../Constants/LowerLegs'
import Back from '../Constants/Back'

import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { LightSpeedOutLeft } from 'react-native-reanimated';
// import { Image } from 'expo-image/build/Image'
// import { Image } from 'expo-image'
// import { Image } from 'react-native-reanimated/lib/typescript/Animated'

type TypeData = {
  bodyPart: string
  equipment: string
  gifUrl: string
  id: string
  name: string
  target: string
  secondaryMuscles: string[]
  instructions: string[]
}

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

const Details = ({ navigation, route }: DetailsProps) => {

  const { index } = route.params
  const [currentIndex, setCurrentIndex] = useState(0)
  const [calories, setCalories] = useState<string>('0')

  const [data, setData] = useState<TypeData[]>([])
  const checkExercise = () => {
    switch (index) {
      case 0:
        setData(Back)
        break;
      case 1:
        setData(Cardio)
        break;
      case 2:
        setData(LowerArms)
        break;
      case 3:
        setData(LowerLegs)
        break;
      case 4:
        setData(Chest)
        break;
      case 5:
        setData(Neck)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    checkExercise()
  }, [])

  

  const setCal = async () => {
    try {
      await AsyncStorage.setItem('Kcal', calories)
      console.log('data saved', calories);

    } catch (e) {
      console.log('Data Storing error');
    }
  }

  const handleNext = () => {
    console.log('ji');

    if (currentIndex < data.length - 1) {
      setCurrentIndex((cur) => cur + 1)
      setCalories(((+calories) + 2.5).toString())
      setCal()
    }
    else {
      ToastAndroid.show('All Exercises Completed!✌️', ToastAndroid.LONG)
      navigation.goBack()
    }
  }
  const handleSkip = () => {
    if (currentIndex < data.length - 1)
      setCurrentIndex((cur) => cur + 1)
    else {
      ToastAndroid.show('All Exercises Completed!✌️', ToastAndroid.LONG)
      navigation.goBack()
    }

  }


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Images/LowerArms/band.gif')}
          style={styles.image}
        />
      </View>
      <Text style={styles.headingText}>{data[currentIndex]?.name}</Text>

      <Text style={{ fontSize: 19, marginLeft: 10, color: '#666' }}>Equipment:   <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#444' }}>{data[currentIndex]?.equipment.toUpperCase()}</Text></Text>

      <Text style={[styles.headingText, { fontSize: 22, color: '#000' }]}>
        Instructions:
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {
          data[currentIndex]?.instructions.map((instruction, index) => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
              key={instruction}>{(index + 1) + '. ' + instruction}
            </Text>
          ))
        }
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSkip}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    width: '100%',
    // height:100
    elevation: 6,
    backgroundColor: '#fff',
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#555',

  },
  button: {
    width: responsiveWidth(45),
    height: responsiveWidth(13),
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#f300a2',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
