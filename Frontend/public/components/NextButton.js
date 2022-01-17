import React from 'react';
import { ViewBase, Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NextButton = ({scrollTo, final}) => {

    return(
        <View style={styles.container, {flexDirection:'row', paddingHorizontal:wp('20%')}}>
            <TouchableOpacity style={styles.buttonSkip} onPress={final}>
                <Text style={{textAlign:"center", color:"#6dd8cb", fontFamily:'Poppins-Regular'}}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNext} onPress={scrollTo}>
                <Text style={{textAlign:"center", color:"white", fontFamily:'Poppins-Regular'}}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles= StyleSheet.create({
    container: {
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonNext: {
        backgroundColor: '#6dd8cb',
        width:wp('40%'),
        paddingVertical:hp('1.5%'),
        marginHorizontal: wp('2.5%'),
        marginVertical:hp('1.3%'),
        borderWidth:1,
        borderColor: 'white',
        borderRadius:100
    },
    buttonSkip:{
        backgroundColor: 'white',
        width:wp('40%'),
        paddingVertical:hp('1.5%'),
        marginHorizontal: wp('2.5%'),
        marginVertical:hp('1.3%'),
        borderWidth:1,
        borderColor: '#6dd8cb',
        borderRadius:100
    }
})

export default NextButton;