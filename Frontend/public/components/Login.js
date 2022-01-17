import React, {useState} from 'react';
import { Text, ScrollView, TextInput, View, StyleSheet, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Log_1 from '../assets/images/log_1.svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Svg from 'react-native-svg';
import { getLog, setLog } from '../isLogin';
import * as ImgUri from '../profileImage';
import * as JustLogin from "./JustLogin";
import {devURL} from '../mainURL';

const storeData = async (token, refreshToken) => {
    try {
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@refreshToken', refreshToken);
        await AsyncStorage.setItem('@recienIngresado', 'Sí');
    } catch (e) {
        console.log(e);
    }
}

const Login = ({nav}) => {
 
    const [sv1, ssv1] = useState(true);
    const [sv2, ssv2] = useState(faEyeSlash);

    const [tv1, stv1] = useState('');
    const [tv2, stv2] = useState('');

    const [cti1, scti1] = useState(0);
    const [cti2, scti2] = useState(0);

    const change = () => {
        switch (sv2) {
            case faEye:
                ssv1(true);
                ssv2(faEyeSlash);
                break;
            case faEyeSlash:
                ssv1(false);
                ssv2(faEye);
                break;
        }
    }

    const reg = () => {
        nav.navigate('Register')
    }

    const ingresar = async () => {
        var errors=0;
        if(tv1.replace(/\s/g,'')===''){
            errors++;
            scti1(2);
        }
        if(tv2.replace(/\s/g,'')===''){
            errors++;
            scti2(2)
        }
        if(errors>0){
            alert('Debe llenar todos los espacios.')
        } else {
            try {
                var result;
                const res = await axios.post(devURL()+'/auth/login', { "email": tv1, "password":tv2 });
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
    }

    return (
        <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={{flex:1}}>
                        <Svg height={wp('85.75%')} width={wp('100%')} viewBox="4 -22 375 375">
                            <Log_1 />
                        </Svg>
                    </View>
                    <View style={{flex:1}}>
                        <View style={styles.container2}>
                            <Text style={{fontSize:wp('7.75%'), color:"#808080", fontFamily:"Poppins-ExtraBold", marginVertical:hp('2%')}}>Ingresar</Text>
                            <View style={{marginVertical:hp('0.5%')}}>
                                <Text style={{color:"#808080", fontSize:wp('3.1%'), marginLeft:wp('1.5%'), fontFamily:'Poppins-Regular'}}>Email o teléfono</Text>
                                <TextInput style={([styles.input, {borderColor:'#ff5b5b', borderWidth:cti1}])} value={tv1} onChangeText={(textValue) => {stv1(textValue), scti1(0)}}/>
                            </View>
                            <View style={{marginVertical:hp('0.5%')}}>
                                <Text style={{color:"#808080", fontSize:wp('3.1%'), marginLeft:wp('1.5%'), fontFamily:'Poppins-Regular'}}>Contraseña</Text>
                                <View style={{flexDirection:"row"}}>
                                    <TextInput style={([styles.inputPass, {borderWidth:cti2}])} secureTextEntry={sv1} value={tv2} onChangeText={(textValue) => {stv2(textValue), scti2(0)}}/>
                                    <View style={([styles.iconBack, {borderWidth:cti2}])}>
                                        <TouchableWithoutFeedback onPress={change}>
                                            <FontAwesomeIcon icon={ sv2 } size={hp('2.5%')} style={styles.icon}/>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{color:"#6dd8cb", textAlign:"right", marginVertical:hp('0.35%'), fontSize:wp('3.65%'), fontFamily:'Poppins-Regular'}}>Olvidé mi contraseña</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginBottom:hp('3.20%'), marginTop:hp('6.3%'), alignItems:'center'}}>
                                <TouchableOpacity style={styles.button} onPress={ingresar}>
                                    <Text style={{textAlign:"center", color:"#6dd8cb", fontFamily:'Poppins-Regular'} }>Ingresar</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:"row", marginTop:hp('1%')}}>
                                    <Text style={{textAlign:"center", color:"#808080", fontFamily:'Poppins-Regular'}}>Soy un usuario nuevo. </Text>
                                    <TouchableOpacity onPress={reg}>
                                        <Text style={{textAlign:"center", color:"#6dd8cb", fontFamily:'Poppins-Regular'}}>Crear una cuenta nueva.</Text>
                                    </TouchableOpacity>
                                </View>
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
        width:wp('110%'),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#e5e5e5",
        borderTopStartRadius:50,
        borderTopEndRadius:50
    },
    input:{
        height:hp('4.4%'),
        width:wp('75.8%'),
        color:"#6dd8cb",
        backgroundColor:"white",
        borderRadius:3,
        fontFamily:'Poppins-Medium',
        paddingVertical:0

    },
    inputPass:{
        height:hp('4.4%'),
        width:wp('67%'),
        color:"#6dd8cb",
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
        fontFamily:'Poppins-Medium',
        paddingVertical:0,
        backgroundColor:'white',
        borderRightWidth:0,
        borderBottomColor:'#ff5b5b',
        borderTopColor:'#ff5b5b',
        borderLeftColor:'#ff5b5b'
    },
    button: {
        backgroundColor: 'white',
        width:wp('80%'),
        paddingVertical:hp('1.5%'),
        marginVertical: hp('1.25%'),
        marginHorizontal: wp('1.25%'),
        borderRadius:100
    },
    icon:{
        backgroundColor:"white",
        marginHorizontal:wp('1.5%'),
        marginVertical:hp('0.8%'),
        color:'#6dd8cb'
    },
    iconBack:{
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        width:wp('8.8%'),
        height:hp('4.4%'),
        backgroundColor:"white",
        borderRightColor:'#ff5b5b',
        borderBottomColor:'#ff5b5b',
        borderTopColor:'#ff5b5b',
        borderLeftWidth:0
    }
})

export default Login;
