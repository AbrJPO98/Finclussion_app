import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import {devURL} from '../../mainURL';
import axios from "axios";

const CreateNewObjectiveBuy1 = ({setScreen, setIdObj}) => {

    const [altura, setAltura] = useState(73.9); 
    const [showDesc, setShowDesc] = useState({"text":0, "textInput":0, "margin":0});
    const [showDescText, setShowDescText] = useState({"texto":'+ Agregar Descripción', 'modo':0});

    const [objectiveName, setObjectiveName] = useState('');
    const [descText, setDescText] = useState('');
    const [userId, setUserId] = useState('');

    const [disButt, setDisButt] = useState(false);

    async function asyncStorage () {
        const token = await AsyncStorage.getItem('@token');
        const tokenDecode = jwt_decode(token);
        setUserId(tokenDecode.user.userId);
    }

    function showDescEvent(){
        switch (showDescText.modo) {
            case 0:
                setShowDescText({"texto":'- Eliminar', 'modo':1});
                setShowDesc({"text":3.1, "textInput":13, "margin":1});
            break;
        
            case 1:
            setShowDescText({"texto":'+ Agregar Descripción', 'modo':0});
            setShowDesc({"text":0, "textInput":0, "margin":0});
            setDescText('');
            break;
        }
    }
 
    async function continuar(){
        setDisButt(true);
        const res = await axios.post(devURL()+'/api/objective/registerObjective', {
            'userId':userId,
            'name':objectiveName,
            'description':descText,
            'type':'Compra',
            'metaData':[],
            'step':1
        });
        console.log(res.data.msg);
        if(res.data.success){
            setIdObj(res.data.id);
            setScreen('2')
        } else {
            setDisButt(false);
        }
    }
 
    asyncStorage();

    return (
        <KeyboardAwareScrollView>
        <ScrollView>
                            <View style={{marginBottom:hp('0.5%'), marginTop:hp('8%')}}>
                                <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-ExtraBold', color:'#7b7b7b', textAlign:'left', width:wp('85%')}}>¿Qué quiere comprar?</Text>
                                <Text style={([styles.text,{width:wp('70%')}])}>Deja que el asistente virtual te ayude a crear tus objetivos.</Text>
                            </View>
                            <View style={{marginTop:hp('1%'), marginBottom:hp('1%')}}>
                                <TextInput value={objectiveName} style={([styles.input,{borderRadius:20}])} onChangeText={text => {setObjectiveName(text)}}/>
                            </View>
                            <View style={{marginVertical:hp(showDesc.margin+'%')}}>
                                <Text style={([styles.text, {fontSize:wp(showDesc.text+'%')}])}>Descripción</Text>
                                <TextInput multiline={true} style={([styles.input, {height:hp(showDesc.textInput+'%')}])} value={descText} onChangeText={text => {setDescText(text)}}/>
                            </View>
                            <View style={{marginVertical:hp('2%'), alignSelf:'flex-end'}}>
                                <TouchableOpacity onPress={showDescEvent}>
                                    <Text style={styles.textDescription}>{showDescText.texto}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginVertical:hp('1%')}}>
                                <TouchableOpacity style={styles.button} onPress={continuar} disabled={disButt}>
                                    <Text style={styles.textButtonCreate}>Continuar</Text>
                                </TouchableOpacity>
                            </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    input:{
        height:hp('6.5%'),
        width:wp('82.5%'),
        color:"#6dd8cb",
        backgroundColor:"white",
        borderRadius:3,
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
    textDescription:{
        color:"#808080",
        fontSize:wp('3.5%'),
        marginVertical:hp('0.5%'),
        marginRight:wp('13%'),
        fontFamily:'Poppins-Regular'
    },
    textButtonCreate:{
        textAlign:"center",
        color:"white",
        fontFamily:'Poppins-Bold'
    },
    button: {
        backgroundColor: '#6dd8cb',
        width:wp('80%'),
        paddingVertical:hp('1%'),
        marginVertical:hp('0.1%'),
        borderRadius:100
    },
});

export default CreateNewObjectiveBuy1;