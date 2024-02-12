import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// data type for props data
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

  const { item } = route.params
  const [currentIndex, setCurrentIndex] = useState(0)
  const [initialCal, setInitialCal] = useState<number>()
  const [work, setWork] = useState<number>()


  const [data, setData] = useState<TypeData[]>([])

  // getting data from Async Storage
  const getCalories = async () => {
    try {
      const cal = await AsyncStorage.getItem('Kcal')
      const prevWork = await AsyncStorage.getItem('work')
      if (prevWork)
        setWork(+prevWork)
      if (cal)
        setInitialCal(+cal)
    } catch (e) {
      console.log('Data fetching error');
    }
  }
  // getting data from Async Storage
  const getWork = async () => {
    try {
      const prevWork = await AsyncStorage.getItem('work')
      if (prevWork)
        setWork(+prevWork)
      console.log('work is ', work);

    } catch (e) {
      console.log('Data fetching error');
    }
  }


  useFocusEffect(
    useCallback(() => {
      getWork()
      getCalories()
    }, [])
  )

  const setCalData = async (data: number) => {
    try {
      await AsyncStorage.setItem('Kcal', data.toString())
      console.log('data saved', data)
    } catch (e) {
      console.log('Data Storing error')
    }
  }

  const setWorkData = async (data: number) => {
    try {
      await AsyncStorage.setItem('work', data.toString())
      console.log('data saved', data)
    } catch (e) {
      console.log('Data Storing error')
    }
  }

  const handleNext = async () => {
    console.log('handel next data -> ' + initialCal)
    setCalData(initialCal ? initialCal + 2.5 : 2.5)
    setWorkData(work ? work + 1 : 0)
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
          source={{ uri: item.gifUrl }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
        >
          <Icon name='close-circle' size={45} color={'red'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headingText}>{item.name}</Text>

      <Text style={{ fontSize: 19, marginLeft: 10, color: '#666' }}>Equipment:   <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#444' }}>{item.equipment.toUpperCase()}</Text></Text>

      <Text style={[styles.headingText, { fontSize: 22, color: '#000' }]}>
        Instructions:
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {
          item.instructions.map((instruction, index) => (
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
          onPress={() => handleNext()}>
          <Text style={styles.buttonText}>Done</Text>
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
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 15,
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
