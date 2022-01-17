import React, {useState} from "react";
import { Animated, View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import BB_1 from '../assets/images/bb_1.svg'
import BB_2 from '../assets/images/bb_2.svg'
import BB_3 from '../assets/images/bb_3.svg'
import BB_4 from '../assets/images/bb_4.svg'
import BB_5 from '../assets/images/bb_5.svg'
import * as JustLogin from "./JustLogin";
import * as RootNavigation from './NavigationRef';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const BottomBar = ({nav}) => {

    const animIcon = new Animated.Value(JustLogin.getLogValue()?0:1);
    const animIconMiddle = new Animated.Value(JustLogin.getLogValue()?0:1);
    const animIconProfile = new Animated.Value(JustLogin.getLogValue()?0:1);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [secondLastname, setSecondlastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    async function asyncStorage(){
        if (await AsyncStorage.getItem('@token')!==undefined) {
            const token = await AsyncStorage.getItem('@token');
            const tokenDecode = jwt_decode(token);
            setName(tokenDecode.user.name);
            setLastname(tokenDecode.user.lastname);
            setSecondlastname(tokenDecode.user.secondlastname);
            setEmail(tokenDecode.user.email);
            setPhone(tokenDecode.user.phone);
        }
    }
    asyncStorage();
    if(JustLogin.getLogValue()){
        Animated.timing(animIcon, {
            toValue:1, 
            duration:500,  
            useNativeDriver:true
        }).start();
    
        Animated.timing(animIconMiddle, {
            toValue:1,
            duration:500,  
            useNativeDriver:true
        }).start();
        JustLogin.setLogValue(false);
        
        Animated.timing(animIconProfile, {
            toValue:1,
            duration:500,  
            useNativeDriver:true
        }).start();
        JustLogin.setLogValue(false);
    } 

    const botonMedio = () => {
        Animated.timing(animIconMiddle, {
            toValue:1.27,
            duration:250,  
            useNativeDriver:true
        }).start();  

        setTimeout(() => {
            Animated.timing(animIconMiddle, {
                toValue:1,
                duration:250,  
                useNativeDriver:true
            }).start(); 
        }, 250);
        setTimeout(() => {
            RootNavigation.navigate('Initial', {});
            RootNavigation.closeDrawer();
            nav.navigate('Dashboard');
        }, 500);
    }
    
    const botonPerfil = () => {
        Animated.timing(animIconProfile, {
            toValue:1.27,
            duration:250,  
            useNativeDriver:true
        }).start();  

        setTimeout(() => {
            Animated.timing(animIconProfile, {
                toValue:1,
                duration:250,  
                useNativeDriver:true
            }).start(); 
        }, 250);
        setTimeout(() => {
            RootNavigation.navigate('UserProfile', {
                "name":name,
                "lastname":lastname,
                "secondlastname":secondLastname,
                "email":email,
                "phone":phone
            });
            RootNavigation.closeDrawer();
            nav.navigate('Dashboard', {
                "name":name,
                "lastname":lastname,
                "secondlastname":secondLastname,
                "email":email,
                "phone":phone
            });
        }, 500);
    }
    
    return (
        <KeyboardAwareScrollView>
            <View style={styles.bottom}>
                <Animated.View style={{flexDirection:"row", justifyContent:"space-around", marginVertical:wp('2%')}}>
                    <TouchableOpacity onPress={botonPerfil}>
                    <Animated.View style={{transform:[{scale :animIconProfile}]}}>
                        <BB_1 style={{marginTop:wp('5.5%')}} />
                    </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {alert("Tarjeta")}}>
                        <Animated.View style={{transform:[{scale :animIcon}]}}>
                            <BB_2 style={{marginTop:wp('5.5%'), marginLeft:wp('0.5%')}}/>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={botonMedio}>
                        <Animated.View style={{transform:[{scale :animIconMiddle}]}}>
                            <BB_3 style={{marginLeft:wp('3%')}}/>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {alert("Flechas")}}>
                        <Animated.View style={{transform:[{scale :animIcon}]}}>
                            <BB_4 style={{marginTop:wp('5.5%')}}/>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {alert("Etiqueta")}}>
                        <Animated.View style={{transform:[{scale :animIcon}]}}>
                            <BB_5 style={{marginTop:wp('5.5%')}}/>
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    bottom:{
        flex:1,
        width:wp('100%'),
        justifyContent:'flex-end',
        backgroundColor:'white'
    }
});

export default BottomBar;