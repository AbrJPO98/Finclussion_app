import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import SidebarIcon from '../../assets/images/sidebar_icon.svg';
import Character from '../../assets/images/character.svg';
import Svg from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from "react-native-gesture-handler";
import CreateNewObjectiveBuy1 from './CreateNewObjectiveBuy1';
import CreateNewObjectiveBuy2 from './CreateNewObjectiveBuy2';
import CreateNewObjectiveBuy3 from './CreateNewObjectiveBuy3';
import CreateNewObjectiveBuy4YES from './CreateNewObjectiveBuy4YES';
import CreateNewObjectiveBuy4NO from './CreateNewObjectiveBuy4NO';
import CreateNewObjectiveBuy5 from './CreateNewObjectiveBuy5';

const CreateNewObjectiveBuyMain = ({nav}) => {

    const [altura, setAltura] = useState(73.9); 
    const [screen, setScreen] = useState('1');
    const [idObj, setIdObj] = useState('');

    function Screens () {
        switch (screen) {
            case '1':
                return( <CreateNewObjectiveBuy1 setScreen={setScreen} setIdObj={setIdObj}/>);
            break;
            case '2':
                return( <CreateNewObjectiveBuy2 setScreen={setScreen} idObj={idObj}/>);
            break;
            case '3':
                return( <CreateNewObjectiveBuy3 setScreen={setScreen} />); 
            break;
            case '4YES':
                return( <CreateNewObjectiveBuy4YES setScreen={setScreen} idObj={idObj}/>); 
            break;
            case '4NO':
                return( <CreateNewObjectiveBuy4NO nav={nav}/>); 
            break;
            case '5':
                return( <CreateNewObjectiveBuy5 idObj={idObj} nav={nav}/>); 
            break;
        }
    }

    return (
        <KeyboardAwareScrollView>
        <ScrollView>
            <View style={styles.container}>
                    <View style={{flex:1}}>
                        <Svg  height={hp('20%')} width={wp('100%')} viewBox="-7 -15 50 170">
                            <Character />
                        </Svg> 
                        <View style={{position:'absolute', width:wp('8%'), height:wp('5%'), marginLeft:wp('6.5%'), marginTop:wp('8%')}}>
                            <TouchableOpacity onPress={() => {nav.openDrawer()}}>
                                <Svg  height={wp('5%')} width={wp('8%')} viewBox="2 -1 15 15">
                                    <SidebarIcon />
                                </Svg>
                            </TouchableOpacity> 
                        </View>
                        <View style={{marginTop:wp('18.1%'), marginLeft:wp('6.4%'), position:'absolute'}}>
                            <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-Bold', color:'#7b7b7b'}}>Crear Objetivo</Text>
                            <Text style={{fontFamily:'Poppins-Medium', color:'#7b7b7b'}}>Formulario #1</Text>
                        </View>
                    </View>
                    <View style={{flex:1, alignItems:'center'}}>
                        <View style={([styles.container2, {height:hp(altura+'%')}])}>
                            {Screens()}
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
    text:{
        color:"#808080",
        fontSize:wp('3.1%'),
        marginLeft:wp('1.5%'),
        marginVertical:hp('0.5%'),
        fontFamily:'Poppins-Regular'
    }
});

export default CreateNewObjectiveBuyMain;