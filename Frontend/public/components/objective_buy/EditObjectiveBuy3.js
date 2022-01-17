import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditObjectiveBuy3 = ({nav, setScreen}) => {

    const [altura, setAltura] = useState(73.9); 

    function continuar(value){
        switch (value) {
            case 1:
                setScreen('4YES');
                break;
        
            case 2:
                setScreen('4NO');
                break;
        }
    }

    return (
        <KeyboardAwareScrollView>
            <View style={{marginBottom:hp('0.5%'), marginTop:hp('7.5%')}}>
                <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-ExtraBold', color:'#7b7b7b', textAlign:'left', width:wp('85%'), marginLeft:wp('1%')}}>Lo vas a comprar con tus ahorros?</Text>
                <Text style={([styles.text,{width:wp('70%')}])}>Deja que el asistente virtual te ayude a crear tus objetivos.</Text>
            </View>
            <View style={{marginVertical:hp('2%')}}>
                <TouchableOpacity style={styles.button} onPress={() => {continuar(1)}}>
                    <Text style={styles.textButtonCreate}>Sí</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {continuar(2)}}>
                    <Text style={styles.textButtonCreate}>No</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    text:{
        color:"#808080",
        fontSize:wp('3.1%'),
        marginLeft:wp('1.5%'),
        marginVertical:hp('0.5%'),
        fontFamily:'Poppins-Regular'
    },
    textButtonCreate:{
        textAlign:"center",
        color:'#7b7b7b',
        fontFamily:'Poppins-ExtraBold'
    },
    button: {
        alignSelf:'center',
        backgroundColor:'white',
        width:wp('80%'),
        paddingVertical:hp('2.5%'),
        marginVertical:hp('2%'),
        borderRadius:20
    },
});

export default EditObjectiveBuy3;