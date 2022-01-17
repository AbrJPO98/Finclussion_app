import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import SidebarIcon from '../assets/images/sidebar_icon.svg';
import Character from '../assets/images/character.svg';
import Svg from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from "react-native-gesture-handler";
import * as Intentions from './Intentions';

const CreateNewObjective1 = ({nav}) => {

    const [altura, setAltura] = useState(73.9); 
 
    const [jsonPrueba, setJsonPrueba] = useState([{"Text": ""}]);

    //const [jsonPrueba, setJsonPrueba] = useState([{"VIID":"VI"+1,"TID":"T"+1}]);

    // jsonPrueba = [{"VIID":"VI"+1,"TID":"T"+1,"TIID":"TI"+1,"Intention":1,"Text": "Input"+1}];
    function pushJson() {
        setAltura(altura+8.1);
        var nJsonPrueba = [...jsonPrueba];
        nJsonPrueba.push({"Text": ""});
        Intentions.setIntentions(nJsonPrueba);
        setJsonPrueba(nJsonPrueba);
        /*var nJsonPrueba = jsonPrueba;
        nJsonPrueba.push({"VIID":"VI"+(jsonPrueba.length+1),"TID":"T"+(jsonPrueba.length+1),"TIID":"TI"+(jsonPrueba.length+1),"Intention":(jsonPrueba.length+1),"Text": "Input"+(jsonPrueba.length+1)});
        var nnJsonPrueba = nJsonPrueba;
        setJsonPrueba([jsonPrueba, {"VIID":"VI"+(jsonPrueba.length+1),"TID":"T"+(jsonPrueba.length+1),"TIID":"TI"+(jsonPrueba.length+1),"Intention":(jsonPrueba.length+1),"Text": "Input"+(jsonPrueba.length+1)}]);
        console.log(jsonPrueba) 
        /*setJsonPrueba([jsonPrueba, {"VIID":"VI"+(jsonPrueba.length+1),"TID":"T"+(jsonPrueba.length+1),"TIID":"TI"+(jsonPrueba.length+1),"Intention":(jsonPrueba.length+1),"Text": "Input"+(jsonPrueba.length+1)}]);
        console.log(jsonPrueba)*/
    }

    /*var contador = jsonPrueba.length;
    function getValue(index){

        if(reCargar){
            reCargar = false;
            return true;
        } else {
            return false;
        }
    }*/

    function changeText(text, index){
        var nJsonPrueba = [...jsonPrueba];
        nJsonPrueba[index].Text = text.nativeEvent.text;
        setJsonPrueba(nJsonPrueba);
    }

    function deleteInput(index){
        setAltura(altura-8.1);
        var nJsonPrueba = jsonPrueba;
        nJsonPrueba.splice(index,1);
        Intentions.setIntentions(nJsonPrueba);
        setJsonPrueba(nJsonPrueba);
    }

    return (
        <KeyboardAwareScrollView>
        <ScrollView>
            <View style={styles.container}>
                    <View style={{flex:1}}>
                        <Svg  height={hp('20%')} width={wp('100%')} viewBox="-7 -15 50 170">
                            <Character />
                        </Svg>
                        <View style={{marginTop:wp('8.1%'), marginLeft:wp('6.4%'), position:'absolute'}}>
                            <TouchableOpacity style={{marginBottom:hp('3%')}} onPress={() => {nav.openDrawer()}}>
                                <SidebarIcon />
                            </TouchableOpacity>
                            <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-Bold', color:'#7b7b7b'}}>Crear Objetivo</Text>
                            <Text style={{fontFamily:'Poppins-Medium', color:'#7b7b7b'}}>Formulario #1</Text>
                        </View>
                    </View>
                    <View style={{flex:1, alignItems:'center'}}>
                        <View style={([styles.container2, {height:hp(altura+'%')}])}>
                            <View style={{marginBottom:hp('0.5%'), marginTop:hp('3%')}}>
                                <Text style={styles.text}>Nombre</Text>
                                <TextInput style={styles.input} />
                            </View>
                            <View style={{marginVertical:hp('0.5%')}}>
                                <Text style={styles.text}>Precio</Text>
                                <TextInput style={styles.input} />
                            </View>
                            <View style={{marginVertical:hp('0.5%')}}>
                                <Text style={styles.text}>Descripción</Text>
                                <TextInput multiline={true} style={([styles.input, {height:hp('10%')}])} />
                                <Text style={([styles.textUnder, {marginBottom:hp('1%')}])}>Parece que ya lo tiene, describalo con detalles.</Text>
                            </View>
                            <View style={{marginVertical:hp('0.5%'), marginLeft:wp('-24%')}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:wp('6%'), fontFamily:'Poppins-Bold', color:'#7b7b7b'}}>Intenciones</Text>
                                    <TouchableOpacity onPress={pushJson}>
                                        <FontAwesomeIcon icon={ faPlusCircle } size={hp('3.5%')} style={{marginTop:hp('0.6%'), marginLeft:wp('4%'), color:'#4BD4CE'}}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{color:"#808080", fontSize:wp('3.1%'),fontFamily:'Poppins-Regular'}}>Motívate recordando tus intenciones!</Text>
                            </View>
                            <View style={{marginVertical:hp('0.5%')}}>
                                {jsonPrueba.map((textInput, key) => {
                                    return (
                                        <View key={key} style={{marginVertical:hp('0.5%')}}>
                                            <Text style={styles.text}>Intención #{key+1}</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <TextInput value={textInput.Text} style={([styles.input, {width:wp('70.5%')}])} onChange={text => {changeText(text, key)}}/>
                                                <TouchableOpacity onPress={() => {deleteInput(key)}}>
                                                    <FontAwesomeIcon icon={ faTrashAlt } size={hp('3.5%')} style={{marginTop:hp('0.4%'), marginLeft:wp('4%'), color:'red'}}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )
                                    }
                                )}
                            </View>
                            <View style={{marginTop:hp('0.5%')}}>
                                <TouchableOpacity style={styles.button} onPress={() => {console.log(jsonPrueba)}}>
                                    <Text style={styles.textButtonCreate}>Crear objetivo</Text>
                                </TouchableOpacity> 
                            </View>
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
    input:{
        height:hp('4.5%'),
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
        fontFamily:'Poppins-Regular'
    },
    textUnder:{
        color:"#808080",
        fontSize:wp('3.1%'),
        alignSelf:'center',
        marginTop:hp('0.5%'),
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
        marginVertical:hp('2%'),
        borderRadius:100
    },
});

export default CreateNewObjective1;