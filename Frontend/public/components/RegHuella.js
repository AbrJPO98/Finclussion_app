import React from 'react';
import { Text, Button, TextInput, View, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Reg_2 from '../assets/images/reg_2.svg';
import Huella from '../assets/images/huella_dig.svg';
import Back from '../assets/images/back.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as JustLogin from "./JustLogin";
import * as ImgUri from "../profileImage"
import {devURL} from '../mainURL';
import Svg from 'react-native-svg';
import { setLog } from '../isLogin';

const storeData = async (token, refreshToken) => {
    try {
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@refreshToken', refreshToken);
        await AsyncStorage.setItem('@recienIngresado', 'Sí');
    } catch (e) {
        console.log(e);
    }
}

const RegHuella = ({route, nav}) => {

    const back = () => {
        nav.navigate('IngPassword');
    }

    const reg = () => {
        nav.navigate('Register')
    }

    const ingresar = async () => {
        try {
            var result;
            const res = await axios.post(devURL()+'/auth/login', { "email": route.params.email, "password":route.params.password });
            result = res.data;
            alert(result.msg);
            if(result.success){
                storeData(result.data.token, result.data.refreshToken);
                setLog(true);
                const tkDecode = jwt_decode(result.data.token);
                JustLogin.setLogValue(true);
                ImgUri.setUri(tkDecode.user.filePath); 
                nav.navigate('Dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={{flex:0.2, alignSelf:'flex-start', marginLeft:wp('6.5%'), marginTop:wp('8%')}}>
                    <TouchableOpacity onPress={back}>
                        <Svg height={wp('8%')} width={wp('8%')} viewBox="0 0 15.5 15.5"> 
                            <Back/> 
                        </Svg> 
                    </TouchableOpacity> 
                </View>
                <View style={{flex:0.5}}>
                    <Svg height={hp('19.65%')} width={wp('100%')} viewBox="5 0 180 180"> 
                        <Reg_2/> 
                    </Svg> 
                </View>
                <View style={{flex:1.5}}>
                    <View style={styles.container2}>
                        <Text style={{fontSize:wp('7%'), color:"#808080", fontFamily:"Poppins-ExtraBold", marginVertical:hp('5.95%')}}>Habilita tu FaceID</Text>
                        <View style={{marginVertical:hp('2.5%')}}>
                            <Huella width="150"/>
                        </View>
                        <View style={{marginTop:hp('3.5%')}}>
                            <TouchableOpacity style={styles.buttonReg} onPress={ingresar}>
                                <Text style={{textAlign:"center", color:"white", fontFamily:'Poppins-Regular'}}>Habilitar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ingresar}>
                                <Text style={{textAlign:"center", color:"#808080", marginVertical:hp('3.25%'), fontFamily:'Poppins-Regular'}}>Ahora no</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}
   
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:wp('100%'),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white"
    },
    container2:{
        flex:1,
        width:wp('100%'),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#e5e5e5",
        borderTopStartRadius:50,
        borderTopEndRadius:50
    },
    buttonReg: {
        backgroundColor: '#6dd8cb',
        width:wp('75%'),
        paddingVertical:hp('1.25%'),
        marginTop:hp('1.25%'),
        borderRadius:100
    }
})

export default RegHuella;
