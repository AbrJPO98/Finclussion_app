import React, {useState} from 'react';
import { Text, Button, TextInput, View, StyleSheet, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Reg_2 from '../assets/images/reg_2.svg';
import Back from '../assets/images/back.svg';
import Svg from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";
import {devURL} from '../mainURL';

const Password = ({route, nav}) => {
 
    const back = () => {
        nav.navigate('Register');
    }

    const [sv1, ssv1] = useState(true);
    const [sv2, ssv2] = useState(faEyeSlash);
    
    const [sv3, ssv3] = useState(true);
    const [sv4, ssv4] = useState(faEyeSlash);

    const [tv1, stv1] = useState('');
    const [tv2, stv2] = useState('');

    const [ct1, sct1] = useState(0);
    const [ct2, sct2] = useState(0);

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
    
    const change2 = () => {
        switch (sv4) {
            case faEye:
                ssv3(true);
                ssv4(faEyeSlash);
                break;
            case faEyeSlash:
                ssv3(false);
                ssv4(faEye);
                break;
        }

    }

    const regHuella = async () => {
        var errors=0;
        if(tv1.replace(/\s/g,'')===''){
            errors++;
            sct1(2);
        }
        if(tv2.replace(/\s/g,'')===''){
            errors++;
            sct2(2);
        }
        if(tv1!==tv2){
            errors++;
        }
        if(errors>0){
            if(tv1!==tv2){
                alert('Las contraseñas no coinciden')
            } else {
                alert('Debe llenar todos los espacios')
            }
        }
        else{
            try {
            var result;
            const res = await axios.post(devURL()+'/auth/register', { 
                "name": route.params.name, 
                "lastname":route.params.lastname,
                "secondLastname":route.params.secondLastname,
                "email":route.params.email, 
                "phone":route.params.phone,
                "password":tv1});
            result = res.data;
            alert(result.msg)
                if(result.success){ 
                nav.navigate('RegHuella', {"email":route.params.email, "password":tv1})
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    const volReg = () => {
        nav.navigate('Register');
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
                    <Svg height={hp('21.8%')} width={wp('100%')} viewBox="5 0 180 180"> 
                        <Reg_2/> 
                    </Svg> 
                </View>
                <View style={styles.container2}>
                        <Text style={{fontSize:wp('7%'), color:"#808080", fontFamily:"Poppins-ExtraBold", marginVertical:hp('6%')}}>Ingresa tu contraseña</Text>
                        <View style={{marginVertical:hp('1.5%')}}>
                            <Text style={{color:"#808080", fontSize:wp('3.1%'), marginLeft:wp('1.5%'), fontFamily:'Poppins-Regular'}}>Contraseña</Text>
                            <View style={{marginVertical:hp('0.2%'), flexDirection:"row"}}>
                                <TextInput style={([styles.inputPass, {borderWidth:ct1}])} secureTextEntry={sv1} value={tv1} onChangeText={(textValue) => {stv1(textValue), sct1(0)}}/>
                                <View style={([styles.iconBack,{borderWidth:ct1}])}>
                                    <TouchableWithoutFeedback onPress={change}>
                                        <FontAwesomeIcon icon={ sv2 } size={hp('3%')} style={styles.icon}/>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View style={{marginVertical:hp('1.5%')}}>
                            <Text style={{color:"#808080", fontSize:wp('3.1%'), marginLeft:wp('1.5%'), fontFamily:'Poppins-Regular'}}>Repetir contraseña</Text>
                            <View style={{marginVertical:hp('0.2%'), flexDirection:"row"}}>
                                <TextInput style={([styles.inputPass, {borderWidth:ct2}])} secureTextEntry={sv3} value={tv2} onChangeText={(textValue) => {stv2(textValue), sct2(0)}}/>
                                <View style={([styles.iconBack, {borderWidth:ct2}])}>
                                    <TouchableWithoutFeedback onPress={change2}>
                                        <FontAwesomeIcon icon={ sv4 } size={hp('3%')} style={styles.icon}/>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop:hp('6.19%'), marginVertical:hp('5.2%')}}>
                            <TouchableOpacity style={styles.buttonReg} onPress={regHuella}>
                                <Text style={{textAlign:"center", color:"white", fontFamily:'Poppins-Regular'}}>Registrar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={volReg}>
                                <Text style={{textAlign:"center", color:"#808080", marginTop:hp('3.75%'), fontFamily:'Poppins-Regular'}}>Atrás</Text>
                            </TouchableOpacity>
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
        flex:1.5,
        width:('110%'),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#e5e5e5",
        borderTopStartRadius:50,
        borderTopEndRadius:50
    },
    buttonReg: {
        backgroundColor: '#6dd8cb',
        width:wp('67%'),
        paddingVertical:hp('1.25%'),
        borderRadius:100
    },
    icon:{
        backgroundColor:"white",
        marginHorizontal:wp('2%'),
        marginVertical:hp('1.55%'),
        color:'#6dd8cb'
    },
    inputPass:{
        height:hp('6.6%'),
        width:wp('67%'),
        color:"#6dd8cb",
        backgroundColor:"white",
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
        fontFamily:'Poppins-Medium',
        paddingVertical:0,
        borderRightWidth:0,
        borderTopColor:'#ff5b5b',
        borderLeftColor:'#ff5b5b',
        borderBottomColor:'#ff5b5b'
    },
    iconBack:{
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        width:wp('11.11%'),
        height:hp('6.6%'),
        backgroundColor:"white",
        borderLeftWidth:0,
        borderTopColor:'#ff5b5b',
        borderRightColor:'#ff5b5b',
        borderBottomColor:'#ff5b5b'
    }
})

export default Password;