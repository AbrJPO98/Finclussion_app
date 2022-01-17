import React, {useState} from 'react';
import { Text, Button, TextInput, View, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Reg_1 from '../assets/images/reg_1.svg';
import Back from '../assets/images/back.svg';
import Svg from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
;import axios from "axios";
import {devURL} from '../mainURL';

const Register = ({nav}) => {
     
    const [tv1, stv1] = useState('');
    const [tv2, stv2] = useState('');
    const [tv3, stv3] = useState('');
    const [tv4, stv4] = useState('');
    const [tv5, stv5] = useState('');
    
    const [cti1, sct1] = useState(0);
    const [cti2, sct2] = useState(0);
    const [cti3, sct3] = useState(0);
    const [cti4, sct4] = useState(0);
    const [cti5, sct5] = useState(0);
    
    const validarCorreo = () => {
        var errores=3;
        try{
            if(tv4.substr(tv4.length-4, tv4.length-1)===".com"){
                errores--;
            }
            if (tv4.charAt(0)!=="@" && tv4.charAt(tv4.length-5)!=="@"){
                errores--;
            }
            var arroba = false;
            for (var i = 1; i< tv4.length-1; i++) {
                var letra = tv4.charAt(i);
                if( letra==="@") {
                   arroba=true;
                 }
           }
           if (arroba) {
            errores--;
           }
           if (errores == 0){
                return true;
           } else {
               return false;
           }
        } catch {
            return false;
        }
    }

    const validarTelefono = () => {
        var errores=9;
        if(tv5.length===8){
            errores--;
        }
        for (var i=0; i < tv5.length; i++){
            var letra = tv5.charAt(i);
            try{
                var numero = parseInt(letra);
                if ( numero >= 0 && numero <= 9) {
                    errores--;
                }
            } catch (e) {
                return false;
            }
        }
        if(errores<=0){
            return true;
        } else {
            return false;
        }
    }
    
    const back = () => {
        nav.navigate('Log');
    }

    const ingPass = async () => {
        var errors=0;
        if(tv1.replace(/\s/g,'')===''){
            errors++;
            sct1(2);
        }
        if(tv2.replace(/\s/g,'')===''){
            errors++;
            sct2(2);
        }
        if(tv3.replace(/\s/g,'')===''){
            errors++;
            sct3(2);
        }
        if(tv4.replace(/\s/g,'')===''){
            errors++;
            sct4(2);
        }
        if(validarCorreo() == false){
            alert('Correo inválido');
            errors++;
        }
        if(tv5.replace(/\s/g,'')===''){
            errors++;
            sct5(2);
        }
        if(validarTelefono() == false){
            alert('Telefono inválido');
            errors++;
        }
        if(errors<=0){
            try {
                console.log('Ingresando.')
                var result;
                const res = await axios.post(devURL()+'/api/lead/registerLead', { "name": tv1, "lastname":tv2, "secondLastname":tv3, "email":tv4, "phone":tv5, "isClient": false});
                result = res.data;
                alert(result.msg)
                if(result.success){
                    nav.navigate('IngPassword', {"name": tv1, "lastname":tv2, "secondLastname":tv3, "email":tv4, "phone":tv5});
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    const volLog = () => {
        nav.navigate('Log')
    }

    return (
        <KeyboardAwareScrollView >
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
                        <Reg_1/> 
                    </Svg> 
                </View>
                <View style={{flex:1.5}}>
                    <View style={styles.container2}>
                        <Text style={{fontSize:wp('7.75%'), color:"#808080", fontFamily:"Poppins-ExtraBold", marginTop:hp('2%')}}>Crear una cuenta</Text>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Nombre</Text>
                            <TextInput style={([styles.input, {borderWidth:cti1}])} value={tv1} onChangeText={(textValue) => {stv1(textValue), sct1(0)}}/>
                        </View>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Primer apellido</Text>
                            <TextInput style={([styles.input, {borderWidth:cti2}])} value={tv2} onChangeText={(textValue) => {stv2(textValue), sct2(0)}}/>
                        </View>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Segundo apellido</Text>
                            <TextInput style={([styles.input, {borderWidth:cti3}])} value={tv3} onChangeText={(textValue) => {stv3(textValue), sct3(0)}}/>
                        </View>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput style={([styles.input, {borderWidth:cti4}])} value={tv4} onChangeText={(textValue) => {stv4(textValue), sct4(0)}}/>
                        </View>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Teléfono</Text>
                            <TextInput maxLength={8} placeholder="########" style={([styles.input, {borderWidth:cti5}])} value={tv5} onChangeText={(textValue) => {stv5(textValue), sct5(0)}} keyboardType='numeric'/>
                        </View>
                        <View style={{marginTop:hp('2.19%')}}>
                            <TouchableOpacity style={styles.button} onPress={ingPass}>
                                <Text style={{textAlign:"center", color:"white", fontFamily:'Poppins-Regular'}}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:"row", marginTop:hp('1.85%'), marginBottom:hp('1.75%')}}>
                            <Text style={{textAlign:"center", color:"#808080", fontFamily:'Poppins-Regular'}}>Ya tengo mi cuenta. </Text>
                            <TouchableOpacity onPress={volLog}>
                                <Text style={{textAlign:"center", color:"#6dd8cb", fontWeight:"600", fontFamily:'Poppins-Regular'}}>Ingresar.</Text>
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
        width:wp('110%'),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#e5e5e5",
        borderTopStartRadius:50,
        borderTopEndRadius:50
    },
    input:{
        height:hp('5%'),
        width:wp('76%'),
        color:"#6dd8cb",
        backgroundColor:"white",
        borderRadius:3,
        fontFamily:'Poppins-Medium',
        borderColor:'#ff5b5b',
        paddingVertical:0
    },
    button: {
        backgroundColor: '#6dd8cb',
        width:wp('76%'),
        paddingVertical:hp('1%'),
        borderRadius:100
    },
    text:{
        color:"#808080",
        fontSize:wp('3.1%'),
        marginLeft:wp('1.5%'),
        fontFamily:'Poppins-Regular'
    }
})

export default Register;