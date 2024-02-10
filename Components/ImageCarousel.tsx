import { Dimensions, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel, { AdditionalParallaxProps, ParallaxImage } from 'react-native-snap-carousel';
import { sliderImages } from '../Constants';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";


const renderItem = ({ item }: any, parallaxProps?: AdditionalParallaxProps) => {
    return (
        <View style={{ width: responsiveWidth(100) - 70, height: responsiveHeight(25) }}>
            <ParallaxImage
                source={item}
                containerStyle={{ borderRadius: 30, flex: 1 }}
                style={{ resizeMode: 'contain' }}
                parallaxFactor={1}
                {...parallaxProps}
            />
        </View>
    )
}


const ImageCarousel = () => {

    return (
        <Carousel
            data={sliderImages}
            loop={true}
            autoplay={true}
            renderItem={renderItem}
            hasParallaxImages={true}
            sliderWidth={responsiveWidth(100)}
            firstItem={1}
            autoplayInterval={4000}
            itemWidth={responsiveWidth(100) - 70}
            slideStyle={{ display: 'flex', alignItems: 'center' }}
        />
    )
}

export default ImageCarousel

const styles = StyleSheet.create({

})