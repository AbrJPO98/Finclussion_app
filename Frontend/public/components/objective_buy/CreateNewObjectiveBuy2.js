import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { devURL } from "../../mainURL";

const CreateNewObjectiveBuy2 = ({idObj, setScreen}) => {

    const [altura, setAltura] = useState(73.9); 
    const [costo, setCosto] = useState('₡0'); 
    
    const [disButt, setDisButt] = useState(false);

    async function continuar(){
        var nCosto = costo.replaceAll(',','')
        nCosto = nCosto.replace('₡','');
        setDisButt(true);
        
        if (costo!=='₡0' && costo!=='') {
            const res = await axios.post(devURL()+'/api/objective/registerObjective', {
                'id':idObj,
                'type':'Compra',
                'cost':nCosto,
                'step':2
            })
            console.log(res.data.msg);
            if(res.data.success){
                setScreen('3');
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
                                <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-ExtraBold', color:'#7b7b7b', textAlign:'left', width:wp('85%'), marginLeft:wp('1%')}}>¿Cuánto cuesta?</Text>
                                <Text style={([styles.text,{width:wp('70%')}])}>Deja que el asistente virtual te ayude a crear tus objetivos.</Text>
                            </View>
                            <View style={{marginVertical:hp('2%')}}>
                                <TextInputMask
                                    style={styles.input}
                                    value={costo}
                                    type={'money'}
                                    options={{
                                        precision:0,
                                        unit:'₡',
                                        separator:'.',
                                        delimiter:','
                                      }}
                                    keyboardType='numeric'
                                    onChangeText={text => {setCosto(text)}}
                                    />
                            </View>
                            
                            <View style={{marginVertical:hp('3.5%')}}>
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
        color:"white",
        fontFamily:'Poppins-Bold'
    },
    button: {
        backgroundColor: '#6dd8cb',
        width:wp('80%'),
        paddingVertical:hp('1%'),
        marginVertical:hp('1%'),
        borderRadius:100
    },
});

export default CreateNewObjectiveBuy2;