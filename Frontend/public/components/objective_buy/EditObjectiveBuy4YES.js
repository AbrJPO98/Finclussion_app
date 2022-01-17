import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import SidebarIcon from '../../assets/images/sidebar_icon.svg';
import Character from '../../assets/images/character.svg';
import Svg from "react-native-svg";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { TextInputMask } from "react-native-masked-text";
import { devURL } from "../../mainURL";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from "react-native-gesture-handler";

const EditObjectiveBuy4YES = ({obj, setScreen}) => {
    
    var parseCost = parseInt(obj.metaData[1].totalSaved);

    const [altura, setAltura] = useState(73.9); 
    const [dinAho, setDinAho] = useState(parseCost.toString());
    
    const [disButt, setDisButt] = useState(false);

    async function continuar(){

        var nDinAho = dinAho.replaceAll(',','')
        nDinAho = nDinAho.replace('₡','');

        setDisButt(true);

        if (dinAho!=='₡0' && dinAho!=='') {
                
            const res = await axios.put(devURL()+'/api/objective/updateObjective', {
                'id':obj.objectiveId,
                'nMoneySaved':nDinAho,
                'type':'Compra',
                'step':3
            })
            console.log(res.data.msg);
            if(res.data.success){
                setScreen('5');
            } else {
                setDisButt(false);
            }
        } else {
            setDisButt(false);
            alert('Digite una cantidad válida');
        }
    }

    return (
        <KeyboardAwareScrollView>
            <View style={{marginBottom:hp('0.5%'), marginTop:hp('7.5%')}}>
                <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-ExtraBold', color:'#7b7b7b', textAlign:'left', width:wp('85%'), marginLeft:wp('1%')}}>¿Cuánto tienes ahorrado?</Text>
                <Text style={([styles.text,{width:wp('70%')}])}>Deja que el asistente virtual te ayude a crear tus objetivos.</Text>
            </View>
            <View style={{marginVertical:hp('2%')}}>
                <TextInputMask
                    style={styles.input}
                    value={dinAho}
                    type={'money'}
                        options={{
                        precision:0,
                        unit:'₡',
                        separator:'.',
                        delimiter:',',
                    }}
                    keyboardType='numeric'
                    onChangeText={text => {setDinAho(text)}}
                />
            </View>
            <View style={{marginVertical:hp('1%')}}>
                <TouchableOpacity style={styles.buttonContinue} onPress={() =>{continuar()}} disabled={disButt}>
                    <Text style={styles.textButtonCreateContinue}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    input:{
        alignSelf:'center',
        height:hp('6.5%'),
        width:wp('82.5%'),
        color:"#6dd8cb",
        backgroundColor:"white",
        borderRadius:20,
        fontFamily:'Poppins-Medium',
        borderColor:'#ff5b5b',
        paddingVertical:0
    },
    text:{
        color:"#808080",
        fontSize:wp('3.1%'),
        marginLeft:wp('1.5%'),
        marginVertical:hp('0.5%'),
        fontFamily:'Poppins-Regular'
    },
    buttonContinue: {
        alignSelf:'center',
        backgroundColor:'#4BD4CE',
        width:wp('80%'),
        paddingVertical:hp('1.5%'),
        marginVertical:hp('2%'),
        borderRadius:50
    },
    textButtonCreateContinue:{
        textAlign:"center",
        color:'white',
        fontFamily:'Poppins-ExtraBold'
    },
});

export default EditObjectiveBuy4YES;