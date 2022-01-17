import React, {useState} from 'react';
import { Text, Image, TextInput, View, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import Reg_1 from '../assets/images/reg_1.svg';
import Back from '../assets/images/back.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Svg from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { launchImageLibrary,  } from 'react-native-image-picker';
import axios from "axios";
import {devURL} from '../mainURL';
import * as ImgUri from '../profileImage';

const Profile = ({route, nav}) => {

    const [imgUri, setImgUri] = useState(ImgUri.getUir());

    const [name, setName] = useState(route.params.name);
    const [lastname, setLastName] = useState(route.params.lastname);
    const [secondlastname, setSecondLastName] = useState(route.params.secondlastname);
    const [email, setEmail] = useState(route.params.email);
    const [phone, setPhone] = useState(route.params.phone);

    const goBack = () => {
        nav.goBack();
    }
    
    const openGallery = () => {
        launchImageLibrary({noData:true}, res => {
            if (res.didCancel) {
                console.log('didCancel');
            } else if (res.errorCode) {
                console.log('errorCode');
            } else if (res.errorMessage) {
                console.log('errorMessage');
            } else {
                try {
                    updateProfileImage(res.assets[0]);
                } catch (error) {
                    console.log(res);
                    console.log(error);
                }
            }
        });
    }
    
    async function updateProfileImage(img){
        let formData = new FormData();
        formData.append("file", {
            'name': img.fileName,
            'type': img.type,
            'uri': img.uri
        });
        formData.append("email", route.params.email);
        await axios.put(devURL()+'/auth/uploadFile', formData, {headers:{'Content-type':'multipart/form-data'}})
        .then(res => {
            console.log('Exitoso.')
            ImgUri.setUri(res.data.file);
            setImgUri(res.data.file);
        })
        .catch(error => {console.log(error)});
    }

    async function updateData(){

        var validacion = true;
        var inputVacio = 0;
        var phoneErrors = 0;

        if (name.replace(/\s/g,'')==='') {
            inputVacio++;
        }
        if (lastname.replace(/\s/g,'')==='') {
            inputVacio++;
        }
        if (secondlastname.replace(/\s/g,'')==='') {
            inputVacio++;
        }
        if (email.replace(/\s/g,'')==='') {
            inputVacio++;
        }
        if (phone.replace(/\s/g,'')==='') {
            inputVacio++;
        }
        if (inputVacio>0) {
            validacion = false;
            alert('Debe rellenar todos los espacios.');
        }
        if (phone.length===8) {
            for (let i = 0; i < phone.length; i++) {
                let nNumber = parseInt(phone.charAt(i));
                if (isNaN(nNumber)) {
                    phoneErrors++;
                }
            }
        } else {
            phoneErrors++;
        }
        if (phoneErrors>0) {
            validacion=false;
            alert("Ingrese un número de teléfono válido.");
        }

        if (validacion) {
            await axios.put(devURL()+'/auth/updateUser', {
                "name":name,
                "lastname":lastname,
                "secondLastname":secondlastname,
                "email":email,
                "phone":phone
            }).then(res => {
                alert(res.data.msg);
                if (res.data.success) {
                    nav.navigate('Initial', {
                        "name":name,
                        "lastname":lastname,
                        "secondlastname":secondlastname,
                        "email":email,
                        "phone":phone
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
     
    return (
        <KeyboardAwareScrollView >
            <View style={styles.container}>
                <View style={{flex:0.2, alignSelf:'flex-start', marginLeft:wp('6.5%'), marginTop:wp('8%')}}>
                    <TouchableOpacity onPress={goBack}>
                        <Svg height={wp('8%')} width={wp('8%')} viewBox="0 0 15.5 15.5"> 
                            <Back/> 
                        </Svg> 
                    </TouchableOpacity> 
                </View>
                <View style={{flex:0.5}}>
                    <Svg height={hp('21.8%')} width={wp('100%')} viewBox="5 0 180 180"> 
                        <Reg_1/> 
                    </Svg> 
                </View>
                <View style={{flex:1.5}}>
                    <View style={styles.container2}>
                        <Text style={{fontSize:wp('7.75%'), color:"#808080", fontFamily:"Poppins-ExtraBold", marginTop:hp('2%')}}>Perfíl del usuario</Text>
                        
                        <Image width={wp('100%')} source={{uri:devURL()+ImgUri.getUir()}} style={styles.profileImage} />

                        <View style={{marginVertical:hp('0.5%')}}>
                            <TouchableOpacity onPress={() => {openGallery()}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={([styles.text,{fontSize:wp('5%'), fontFamily:'Poppins-Bold'}])}>Cambiar imagen  </Text>
                                    <FontAwesomeIcon icon={ faCamera } size={hp('3.5%')} style={{color:'#4BD4CE'}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Nombre</Text>
                            <TextInput value={name} style={([styles.input])} onChange={text => {setName(text.nativeEvent.text)}}/>
                        </View>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Primer apellido</Text>
                            <TextInput value={lastname} style={([styles.input])} onChange={text => {setLastName(text.nativeEvent.text)}}/>
                        </View>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Segundo apellido</Text>
                            <TextInput value={secondlastname} style={([styles.input])} onChange={text => {setSecondLastName(text.nativeEvent.text)}}/>
                        </View>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput editable={false} value={email} style={([styles.input])} onChange={text => {setEmail(text.nativeEvent.text)}}/>
                        </View>
                        <View style={{marginVertical:hp('0.7%')}}>
                            <Text style={styles.text}>Teléfono</Text>
                            <TextInput value={phone} maxLength={8} placeholder="########" style={([styles.input])} onChange={text => {setPhone(text.nativeEvent.text)}} keyboardType='numeric'/>
                        </View>
                        <View style={{marginVertical:hp('2.19%')}}>
                            <TouchableOpacity style={styles.button} onPress={updateData}>
                                <Text style={{textAlign:"center", color:"white", fontFamily:'Poppins-Regular'}} >Guardar Información</Text>
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
        borderTopEndRadius:50,
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
        marginBottom:hp('11%'),
        borderRadius:100
    },
    text:{
        color:"#808080",
        fontSize:wp('3.1%'),
        marginLeft:wp('1.5%'),
        fontFamily:'Poppins-Regular'
    },
    profileImage:{
        width:wp('30%'),
        height:wp('30%'),
        backgroundColor:'white',
        borderRadius:100,
        borderWidth:5,
        borderColor:'#6dd8cb',
        marginVertical:hp('1.5%')
    }
})

export default Profile;