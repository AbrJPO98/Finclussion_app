import React, {useState} from "react";
import { StyleSheet, View, Animated, TouchableOpacity, Text, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList, useDrawerStatus } from "@react-navigation/drawer";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { devURL } from "../mainURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import * as ImgUri from '../profileImage';

const CustomDrawer = (props) => {
    
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [correoUsuario, setCorreoUsuario] = useState('');

    const asyncDatos = async () => {
        try {
            const token = await AsyncStorage.getItem('@token');

            const tokenDecode = jwt_decode(token);

            setNombreUsuario(tokenDecode.user.name);
            setCorreoUsuario(tokenDecode.user.email);
        } catch (e) {
            console.log(e);
        }
    }

    const animBar = new Animated.Value(750);

    const isDrawerOpen = useDrawerStatus() === 'open';

    asyncDatos();

    Animated.timing(animBar, {
        toValue:0,
        duration:350,  
        useNativeDriver:true
    }).start(); 

    const cerrarDrawer =  () => {
        Animated.timing(animBar, {
            toValue:750,
            duration:350,  
            useNativeDriver:true
        }).start();
        setTimeout(() => {
            props.navigation.closeDrawer();
        }, 100);
    }

    return (
        <Animated.View style={{flex:1, opacity:isDrawerOpen?1:0, transform:[{translateY:animBar}]}}>
            <View style={{height:hp('28%'), justifyContent:'center', alignContent:'center', marginTop:hp('3%')}}>
                <View style={{flexDirection:'row', alignContent:'center',}}>
                    <TouchableOpacity>
                        <Image width={wp('100%')} source={{uri:devURL()+ImgUri.getUir()}} style={styles.profileImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {cerrarDrawer()}}>
                        <FontAwesomeIcon icon={faTimesCircle} style={{color:'white', marginTop:hp('3%'), marginHorizontal:wp('35%')}} size={wp('10%')}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:wp('3.5%'), marginLeft:wp('10%')}}>
                    <Text style={{fontFamily:'Poppins-Bold', color:'white', fontSize:wp('6%')}}>{nombreUsuario}</Text>
                    <Text style={{fontFamily:'Poppins-Bold', color:'white', fontSize:wp('3.5%'), opacity:0.5}}>{correoUsuario}</Text>
                </View>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <View style={{height:hp('20%'), justifyContent:'flex-start', alignContent:'center'}}>
                <TouchableOpacity style={styles.logOutButton}>
                    <Text style={{color:'#4BD4CE', textAlign:'center', marginTop:hp('1.1%')}}>Salir</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    profileImage:{
        height:wp('22.5%'),
        width:wp('22.5%'),
        borderWidth:2,
        borderColor:'white',
        borderRadius:100,
        marginRight:wp('8%'),
        backgroundColor:'gray',
        marginHorizontal:wp('10%')
    },
    logOutButton:{
        fontFamily:'Poppins-Bold',
        backgroundColor:'white',
        width:wp('35%'),
        height:hp('5%'),
        marginLeft:wp('10%'),
        marginTop:wp('5%'),
        borderRadius:100
    }
})

export default CustomDrawer;