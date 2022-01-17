import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import New_objective from '../assets/images/new_objective.svg';
import Back_New_objective from '../assets/images/backgroud_new_objective.svg';
import FirstObjectiveType from '../assets/images/firstObjectiveType.svg';
import SecondObjectiveType from '../assets/images/secondObjectiveType.svg';
import ThirdObjectiveType from '../assets/images/thirdObjectiveType.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { setObjectiveType } from "../objectiveType";
import Svg from "react-native-svg";

const SelectNewObjective = ({nav}) => {

    const createObjective1 = () => {
        alert('Crédito');
        //setObjectiveType('Credito');
        //nav.navigate('CreateNewObjective1');
    }

    const createObjective2 = () => {
        alert('Ahorro');
        //setObjectiveType('Ahorro');
        //nav.navigate('CreateNewObjective1');
    }

    const createObjective3 = () => {
        nav.navigate('CreateNewObjectiveBuyMain');
    }

    return (
        <View style={styles.container}>
            <Svg viewBox="0 0 450 500">
                <Back_New_objective />
            </Svg>
            <View style={{position:'absolute'}}>
                <View style={{marginHorizontal:wp('5.5%'), marginVertical:hp('2%'), width:wp('60%')}}>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize:wp('4.5%')}}>Crear un nuevo objetivo</Text>
                    <Text style={{fontFamily:'Poppins-Bold', color:'gray'}}>Selecciona tu objetivo</Text>
                </View>
                <View >
                    <Svg height={hp('60%')} width={wp('120%')} viewBox="-15 -20 500 500">
                        <New_objective />
                    </Svg>
                </View>
                <View style={{position:'absolute', alignItems:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginLeft:wp('24.75%'), marginTop:hp('21.75%')}}>
                            <TouchableOpacity onPress={createObjective1}>
                                <Svg height={wp('30%')} width={wp('30%')} viewBox="0 0 119 119">
                                    <FirstObjectiveType />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:wp('4.5%'), marginTop:hp('21.75%')}}>
                            <TouchableOpacity onPress={createObjective2}>
                                <Svg height={wp('30%')} width={wp('30%')} viewBox="0 0 119 119">
                                    <SecondObjectiveType />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginLeft:wp('-9.5%'), marginTop:hp('2.25%')}}>
                            <TouchableOpacity onPress={createObjective3}>
                                <Svg height={wp('30%')} width={wp('30%')} viewBox="0 0 119 119">
                                    <ThirdObjectiveType />
                                </Svg> 
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </View>
        </View>
    );;
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:wp('100%'),
        backgroundColor:"white"
    }
})

export default SelectNewObjective;