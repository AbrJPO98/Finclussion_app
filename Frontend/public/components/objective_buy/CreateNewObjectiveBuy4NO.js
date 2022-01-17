import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import SidebarIcon from '../../assets/images/sidebar_icon.svg';
import Character from '../../assets/images/character.svg';
import Svg from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from "react-native-gesture-handler";

const EditObjectiveBuy4NO = ({nav}) => {

    const [altura, setAltura] = useState(73.9); 

    function continuar(){
        nav.navigate('Initial', {});
    }
 
    return (
        <KeyboardAwareScrollView>
            <View style={{marginBottom:hp('0.5%'), marginTop:hp('7.5%')}}>
                <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-ExtraBold', color:'#7b7b7b', textAlign:'left', width:wp('85%'), marginLeft:wp('3%')}}>Lo vas a comprar con tus ahorros?</Text>
            </View>
            <View style={{marginVertical:hp('2%')}}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButtonCreate}>Sí</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButtonCreate}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContinue} onPress={() => {continuar()}}>
                    <Text style={styles.textButtonCreateContinue}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    textButtonCreate:{
        textAlign:"center",
        color:'#7b7b7b',
        fontFamily:'Poppins-ExtraBold'
    },
    textButtonCreateContinue:{
        textAlign:"center",
        color:'white',
        fontFamily:'Poppins-ExtraBold'
    },
    button: {
        backgroundColor:'white',
        width:wp('80%'),
        paddingVertical:hp('2.5%'),
        marginVertical:hp('2%'),
        borderRadius:20
    },
    buttonContinue: {
        backgroundColor:'#4BD4CE',
        width:wp('80%'),
        paddingVertical:hp('1.5%'),
        marginVertical:hp('2%'),
        borderRadius:50
    },
});

export default EditObjectiveBuy4NO;