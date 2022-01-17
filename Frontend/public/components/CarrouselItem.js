import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, {Path} from 'react-native-svg';
import Carrousel_1 from '../assets/images/carrousel_1.svg';
import Carrousel_2 from '../assets/images/carrousel_2.svg';
import Carrousel_3 from '../assets/images/carrousel_3.svg';

const CarrouselItem = ({item}) => {

    const imgSvg = (id) => {
        switch (id) {
            case '1':
                return(
                    <View style={{ width:wp('30%'), height:hp('30%')}}>
                        <Svg height={wp('100%')} width={wp('100%')} viewBox="-12.5 0 335 335">
                            <Carrousel_1 />
                        </Svg>
                    </View>
                );
            case '2':
                return(
                    <View style={{ width:wp('57.5%'), height:hp('30%')}}>
                        <Svg height={wp('100%')} width={wp('100%')} viewBox="-12.5 0 335 335">
                            <Carrousel_2 />
                        </Svg>
                    </View>
                );
            case '3':
                return(
                    <View style={{ width:wp('76%'), height:hp('30%')}}>
                        <Svg height={wp('100%')} width={wp('100%')} viewBox="-12.5 0 450 450">
                            <Carrousel_3 />
                        </Svg>
                    </View>
                );
        }
    }

    const {width} = useWindowDimensions();

  return (
    <View style={([styles.container, {width}])}>
            {imgSvg(item.id)}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    image: {
        flex: 0.7,
        justifyContent:'center'
    },
    title:{
        fontFamily:'Poppins-ExtraBold',
        fontSize:wp('7%'),
        marginBottom:hp('1%'),
        color:'#6dd8cb',
        textAlign:'center'
    },
    description:{
        fontFamily:'Poppins-Medium',
        fontSize:wp('3.5%'),
        color:'#6dd8cb',
        textAlign:'center',
        paddingHorizontal:wp('15%')
    }
})

export default CarrouselItem;
