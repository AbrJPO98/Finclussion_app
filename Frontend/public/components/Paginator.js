import React from "react";
import { View, Animated, useWindowDimensions, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Paginator = ({data, scrollX}) => {
    const {width} = useWindowDimensions();
    return (
        <View style={{flexDirection: 'row', height:hp('10%')}}>
            {data.map((_, i) => {
                const inptrng = [(i-1)*width, i*width, (i+1)*width];
                const dotWidth = scrollX.interpolate({
                    inputRange: inptrng,
                    outputRange:[10,20,10],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange: inptrng,
                    outputRange: [0.3,1,0.3],
                    extrapolate: 'clamp'
                })
                return <Animated.View
                    style={[styles.dot, {width:dotWidth, opacity}]}
                    key={i.toString()}
                />
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    dot:{
        height:hp('1.2%'),
        borderRadius:5,
        backgroundColor:"gray",
        marginHorizontal:wp('3%')
    }
});

export default Paginator;