import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import ImageCarousel from '../Components/ImageCarousel'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import BodyParts from '../Components/BodyParts'
import LinearGradient from 'react-native-linear-gradient'
import { bodyParts } from '../Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: NavigationProps) => {
  const [data, setData] = useState<string>()
  const [kcal, setKcal] = useState<string>()
  const getCalories = async () => {
    try {
      const cal = await AsyncStorage.getItem('Kcal')
      if (cal)
        setKcal(cal)
    } catch (e) {
      // read error
    }
  }

  useEffect(() => {
    getCalories()
  }, [kcal])

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headingText}>Home Work Out</Text>
        <View style={styles.topTextContainer}>
          <View >
            <Text style={styles.topText}>0</Text>
            <Text style={styles.topText}>WORKOUT</Text>
          </View>
          <View >
            <Text style={styles.topText}>{kcal? kcal:'0' }</Text>
            <Text style={styles.topText}>KCAL</Text>
          </View>
          <View >
            <Text style={styles.topText}>0</Text>
            <Text style={styles.topText}>MINUTES</Text>
          </View>
        </View>
      </View>

      {/* Image carousel */}
      <View style={{ marginTop: -70 }}>
        <ImageCarousel />
      </View>


      {/* Body Parts */}

      <View style={styles.bodyPartsContainer}>
        <Text style={styles.name}>Exercises</Text>
        <FlatList
          style={{ marginBottom: 10 }}
          data={bodyParts}
          keyExtractor={item => item.name}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 0 }}
          columnWrapperStyle={{
            justifyContent: 'space-between'
          }}
          renderItem={({ item, index }) => (
            <View style={{ marginBottom: 20 }} key={index}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Exercises', { name: item.name, image: item.image, index: index })
                }}
                activeOpacity={0.6}
                style={{
                  width: responsiveWidth(44),
                  borderRadius: 30,
                  height: responsiveHeight(22),
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <Image
                  source={item.image}
                  resizeMode='cover'
                  style={{
                    width: responsiveWidth(44),
                    height: responsiveHeight(22),
                    borderRadius: 30,
                    position: 'absolute'
                  }}
                />

                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)',]}
                  style={{
                    borderBottomRightRadius: 30,
                    borderBottomLeftRadius: 30,
                    width: responsiveWidth(44),
                    height: '20%'
                  }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#fff',
                      textAlign: 'center',

                    }}>
                    {item.name.toUpperCase()}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )
          }
        />


      </View >
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ccc'
  },
  topContainer: {
    width: '100%',
    height: '28%',
    backgroundColor: '#f3a200',
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'white',
    marginTop: 10,
  },
  topTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  topText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  carouselContaner: {
    marginTop: -60,
    height: 130,
    width: '100%',
    backgroundColor: '#f00',
  },
  bodyPartsContainer: {
    marginHorizontal: 12,
    // paddingBottom: 10,
    flex: 1,
  },
  name: {
    fontSize: responsiveFontSize(4),
    fontWeight: '700',
    color: '#666',
  },
})