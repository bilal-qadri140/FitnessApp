import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { fetchData } from '../api/exerciseDB'
import Icon from 'react-native-vector-icons/Ionicons'

import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

// data type for getting data from api call
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
// props for screen
type ExercisesProps = NativeStackScreenProps<RootStackParamList, 'Exercises'>
const Exercises = ({ route, navigation }: ExercisesProps) => {
    const { name, image } = route.params

    const [data, setData] = useState<TypeData[]>([])

    // gettig Exercise data from Rapid APi
    const getExercises = async (name: string) => {
        const data = await fetchData(name)
        if (data)
            setData(data)
        console.log('Data is : ', data);
    }
    useEffect(() => {
        if (name)
            getExercises(name)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                {/* image */}
                <Image
                    source={image}
                    style={styles.image}
                />
                {/* Screen close icon */}
                <TouchableOpacity
                    style={styles.iconContainer}
                    activeOpacity={0.6}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='close-circle' size={45} color={'red'} />
                </TouchableOpacity>
            </View>
            {/* heading name */}
            <Text style={styles.headingName}>{name.toUpperCase() + ' Exercises'}</Text>

            {/* Exercises */}
            {data != undefined ? <FlatList
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
                        navigation.navigate('Details', { item: item })
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
                            color: '#666',
                            textTransform:'capitalize'
                        }}
                            
                        >
                            {item.name.length > 20 ? item.name.slice(0, 17) + '...' : item.name}
                        </Text>
                    </TouchableOpacity>

                )}
            /> :
                <Text style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '45%',
                    color: '#000',

                }}>Data not found 😒</Text>}
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
        right: 15,

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