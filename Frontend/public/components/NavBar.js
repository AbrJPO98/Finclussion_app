import React, {useState} from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LightBall from '../assets/images/light_ball.svg';
import Notification from '../assets/images/notification.svg';
import SidebarIcon from '../assets/images/sidebar_icon.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImgUri from '../profileImage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { devURL } from "../mainURL";
import jwt_decode from "jwt-decode";
import Svg from "react-native-svg";

const NavBar = ({nav}) => {

    const [name, setName] = useState('');

    async function asyncStorage(){
        if (await AsyncStorage.getItem('@token')!==undefined) {
            const token = await AsyncStorage.getItem('@token');
            const tokenDecode = jwt_decode(token);
            setName(tokenDecode.user.name);
        }
    }

    asyncStorage();

    return (
        <View style={styles.top}>
            <View style={{marginTop:hp('2.5%')}}>
                <View style={{marginLeft:wp('-43.5%'), marginTop:hp('1.4%'), position:'absolute', width:wp('8%'), height:wp('5%')}}>
                    <TouchableOpacity onPress={() => {nav.openDrawer()}}>
                        <Svg height={wp('5%')} width={wp('8%')} viewBox="2 -1 15 15">
                            <SidebarIcon />
                        </Svg>
                    </TouchableOpacity> 
                </View>
                    <View style={{marginLeft:wp('35%'), position:'absolute', width:wp('10%'), height:wp('10%')}}>
                        <TouchableOpacity onPress={() => {alert("Tips")}}>
                            <Svg height={wp('10%')} width={wp('10%')} viewBox="2.5 3 30 30">
                                <LightBall />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginLeft:wp('20%'), position:'absolute', width:wp('10%'), height:wp('10%')}}>
                        <TouchableOpacity onPress={() => {alert("Notificaciones")}}>
                            <Svg height={wp('10%')} width={wp('10%')} viewBox="2.5 3 30 30">
                                <Notification />
                            </Svg>
                        </TouchableOpacity>
                    </View>
            </View>
            <View style={{marginTop:wp('15%')}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{alignContent:'flex-start', width:wp('50%')}}>
                        <Text style={{fontSize:wp('5.5%'), fontFamily:'Poppins-Regular', marginLeft:wp('5%')}}> Hola! </Text>
                        <Text style={{fontSize:wp('5.5%'), color:"#6dd8cb", fontFamily:'Poppins-Bold', marginLeft:wp('5%')}}> {name+'!'} </Text>
                    </View>
                    <View style={{ alignItems:'flex-end', width:wp('50%')}}>
                        <TouchableOpacity>
                            <Image width={wp('100%')} source={{uri:devURL()+ImgUri.getUir()}} style={styles.profileImage} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    top:{
        flex:1,
        alignItems:"center",
        backgroundColor:"white"
    },
    profileImage:{
        height:wp('18%'),
        width:wp('18%'),
        borderWidth:2,
        borderColor:"#6dd8cb",
        borderRadius:100,
        marginRight:wp('8%')
    }
});

export default NavBar;