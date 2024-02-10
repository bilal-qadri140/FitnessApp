import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { fetchData } from '../api/exerciseDB'
import Icon from 'react-native-vector-icons/Ionicons'

import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import { demoExercises } from '../Constants'
import fitnessData from '../Constants/fitnessData'

// Exercises Details data
import Neck from '../Constants/Neck'
import Chest from '../Constants/Chest'
import Cardio from '../Constants/Cardio'
import LowerArms from '../Constants/LowerArms'
import LowerLegs from '../Constants/LowerLegs'
import Back from '../Constants/Back'



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

type ExercisesProps = NativeStackScreenProps<RootStackParamList, 'Exercises'>
const Exercises = ({ route, navigation }: ExercisesProps) => {
    const { name, image, index } = route.params
    
    const [data, setData] = useState<TypeData[]>([])

    const checkExercise = () => {
        switch (name) {
            case 'back':
                setData(Back)
                break;
            case 'cardio':
                setData(Cardio)
                break;
            case 'lower arms':
                setData(LowerArms)
                break;
            case 'lower legs':
                setData(LowerLegs)
                break;
            case 'chest':
                setData(Chest)
                break;
            case 'neck':
                setData(Neck)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        checkExercise()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={image}
                    style={styles.image}
                />
                <TouchableOpacity
                    style={styles.iconContainer}
                    activeOpacity={0.6}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='caret-back' size={40} color={'white'}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.headingName}>{name.toUpperCase() + ' Exercises'}</Text>
            <FlatList
                data={data}
                style={{ marginBottom: 10 }}
                keyExtractor={item => item.name}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 20 }}
                columnWrapperStyle={{
                    justifyContent: 'space-around'
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => {
                        // navigation.navigate('Details')
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            margin: 10,
                            borderRadius: 30,
                            elevation: 5
                        }}>
                            <Image
                                source={{ uri: item.gifUrl }}
                                style={styles.detailsImage}
                            />
                        </View>
                        <Text style={{
                            marginLeft: 15,
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#666'
                        }}>
                            {item.name.length > 20 ? item.name.slice(0, 17) + '...' : item.name}
                        </Text>
                    </TouchableOpacity>

                )}
            />
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Details',{index:index})}>
                <Text style={styles.buttonText}>Start Exercise</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Exercises

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    imageContainer: {
        elevation: 10,
        shadowColor: '#000',
        height: 'auto',
        backgroundColor: '#fff',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    icon: {
        // flex:1,
    },
    iconContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#f00',
        borderRadius: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 3,
    },
    image: {
        width: '100%',
        height: responsiveHeight(35),
        resizeMode: 'stretch',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    headingName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
        marginVertical: 10,
        color: '#555'
    },
    detailsImage: {
        width: 170,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 30,
    },
    button: {
        width: responsiveWidth(70),
        height: responsiveWidth(15),
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#000',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#f300a2',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})