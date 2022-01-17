import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { devURL } from "../../mainURL";

const CreateNewObjectiveBuy5 = ({idObj, nav}) => {

    const [altura, setAltura] = useState(73.9); 
    const [dinMes, setDinMes] = useState('₡0');

    const [disButt, setDisButt] = useState(false);

    async function continuar(){
        var nDinMes = dinMes.replaceAll(',','');
        nDinMes = nDinMes.replace('₡','');
        setDisButt(true);
        
        if (dinMes!=='₡0' && dinMes!=='') {
            const res = await axios.post(devURL()+'/api/objective/registerObjective', {
                'id':idObj,
                'moneyPerMonth':nDinMes,
                'type':'Compra',
                'step':4
            })
            console.log(res.data.msg);
            if(res.data.success){
                nav.navigate('Initial', {});
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
        <ScrollView>
                            <View style={{marginBottom:hp('0.5%'), marginTop:hp('7.5%')}}>
                                <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-ExtraBold', color:'#7b7b7b', textAlign:'left', width:wp('85%'), marginLeft:wp('1%')}}>¿Cuánto puedes ahorrar por mes?</Text>
                                <Text style={([styles.text,{width:wp('70%')}])}>Deja que el asistente virtual te ayude a crear tus objetivos.</Text>
                            </View>
                            <View style={{marginVertical:hp('2%')}}>
                                <TextInputMask
                                    style={styles.input}
                                    value={dinMes}
                                    type={'money'}
                                    options={{
                                        precision:0,
                                        unit:'₡',
                                        separator:'.',
                                        delimiter:','
                                      }}
                                    keyboardType='numeric'
                                    onChangeText={text => {setDinMes(text)}}
                                    />
                            </View>
                            <View style={{marginVertical:hp('1%')}}>
                                <TouchableOpacity style={styles.buttonContinue} onPress={continuar} disabled={disButt}>
                                    <Text style={styles.textButtonCreateContinue}>Continuar</Text>
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
    textButtonCreate:{
        textAlign:"center",
        color:'#7b7b7b',
        fontFamily:'Poppins-ExtraBold'
    },
    buttonContinue: {
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

export default CreateNewObjectiveBuy5;