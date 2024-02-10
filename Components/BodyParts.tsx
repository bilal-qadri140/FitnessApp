import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { bodyParts } from '../Constants'

import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type BodyPartsProps = NativeStackScreenProps<RootStackParamList>
const BodyParts = () => {
    const [data, setData] = useState<string>()

    useEffect(() => {
        const getData = async () => {
            const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio?limit=10';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '8dad6d0c59msh4284bccf0694c95p12927cjsneb10bffb90a9',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            }

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log('Result is :===>> ',result);
                
                setData(result)
            } catch (error) {
                console.error(error);
            }
        }
        getData()

    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.name}>Exercises</Text>
            <FlatList
                style={{ marginBottom: 30 }}
                data={bodyParts}
                keyExtractor={item => item.name}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 0 }}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                renderItem={({ item, index }) => (
                    <View style={{ marginBottom: 20 }}>
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('Exercises')
                                console.log(data);

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
    )
}

export default BodyParts

const styles = StyleSheet.create({
    container: {
        // marginTop: 6,
        marginHorizontal: 12,
        paddingBottom: 20,
    },
    name: {
        fontSize: responsiveFontSize(4),
        fontWeight: '700',
        color: '#666',
    },

})