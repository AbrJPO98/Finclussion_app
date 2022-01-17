import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import SidebarIcon from '../assets/images/sidebar_icon.svg';
import Character from '../assets/images/character.svg';
import Svg from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from "react-native-gesture-handler";
import * as Intentions from './Intentions';

const CreateNewObjective1 = ({nav}) => {

    const [altura, setAltura] = useState(73.9); 
 
    return (
        <KeyboardAwareScrollView>
        <ScrollView>
            <View style={styles.container}>
                    <View style={{flex:1}}>
                        <Svg  height={hp('20%')} width={wp('100%')} viewBox="-7 -15 50 170">
                            <Character />
                        </Svg>
                        <View style={{marginTop:wp('8.1%'), marginLeft:wp('6.4%'), position:'absolute'}}>
                            <TouchableOpacity style={{marginBottom:hp('3%')}} onPress={() => {nav.openDrawer()}}>
                                <SidebarIcon />
                            </TouchableOpacity>
                            <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-Bold', color:'#7b7b7b'}}>Crear Objetivo</Text>
                            <Text style={{fontFamily:'Poppins-Medium', color:'#7b7b7b'}}>Formulario #1</Text>
                        </View>
                    </View>
                    <View style={{flex:1, alignItems:'center'}}>
                        <View style={([styles.container2, {height:hp(altura+'%')}])}>
                            
                        </View>
                    </View>
            </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    container2:{
        flex:1,
        alignItems:"center",
        width:wp('110%'),
        backgroundColor:"#e5e5e5",
        borderTopStartRadius:50,
        borderTopEndRadius:50,
    },
    input:{
        height:hp('4.5%'),
        width:wp('82.5%'),
        color:"#6dd8cb",
        backgroundColor:"white",
        borderRadius:3,
        fontFamily:'Poppins-Medium',
        borderColor:'#ff5b5b',
        paddingVertical:0
    },
    text:{
        color:"#808080",
        fontSize:wp('3.1%'),
        marginLeft:wp('1.5%'),
        fontFamily:'Poppins-Regular'
    },
    textUnder:{
        color:"#808080",
        fontSize:wp('3.1%'),
        alignSelf:'center',
        marginTop:hp('0.5%'),
        fontFamily:'Poppins-Regular'
    },
    textButtonCreate:{
        textAlign:"center",
        color:"white",
        fontFamily:'Poppins-Bold'
    },
    button: {
        backgroundColor: '#6dd8cb',
        width:wp('80%'),
        paddingVertical:hp('1%'),
        marginVertical:hp('2%'),
        borderRadius:100
    },
});

export default CreateNewObjective1;