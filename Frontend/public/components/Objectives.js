import React, {useState} from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DashboardNoObjetives from '../assets/images/dashboard_no_objectives.svg';
import DashboardObjetives from '../assets/images/dashboard_objectives.svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircularProgress from 'react-native-circular-progress-indicator';
import axios from "axios";
import { devURL } from "../mainURL";
import jwt_decode from "jwt-decode";
import Svg from "react-native-svg";

var objectives = [];

const noObjectives = ({nav}) => {

    const NewObjective = () => {
        nav.navigate('SelectNewObjective');
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{marginTop:wp('3%'), marginHorizontal:wp('5.5%'),}}>
                    <Text style={{fontSize:wp('4%'), color:"#808080", fontFamily:'Poppins-Regular'}}>Aún no tienes ningún objetivo.</Text>
                    <TouchableOpacity onPress={NewObjective}>
                        <Text style={{fontSize:wp('5.5%'), fontFamily:'Poppins-Bold'}}>Crear un objetivo nuevo.</Text>
                    </TouchableOpacity>
                    <View style={{marginTop:hp('6.5%')}}>
                        <TouchableOpacity onPress={NewObjective}>
                            <Svg height={hp('30%')} width={wp('100%')} viewBox="35 0 305 305">
                                <DashboardNoObjetives />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const withObjectives = ({nav}) => {

    const NewObjective = () => {
        nav.navigate('SelectNewObjective');
    }

    const Editar = (obj) => {
        switch (obj.type) {
            case 'Compra':
                nav.navigate('EditObjectiveBuyMain', {
                    "objectiveId":obj.objectiveId,
                    "name":obj.name,
                    "description":obj.description,
                    "type":obj.type,
                    "metaData":obj.metaData
                });
            break;
            case 'Ahorro':
                
            break;
            case 'Credito':
                
            break;
        }
    }

    return (
        <View style={styles.containerObjectives}>
            <ScrollView>
                <View style={{marginLeft:wp('4%'), marginTop:hp('2%')}}>
                    <Text style={{fontSize:wp('4.5%'), fontFamily:'Poppins-Bold'}}>Mira tu progreso en tus objetivos</Text>
                    <Text style={{fontSize:wp('3%'), color:"#808080", fontFamily:'Poppins-Regular'}}>Nunca dejes de planificar</Text>
                </View>
                <View style={{marginTop:hp('2%')}}>
                    {objectives.map((obj, key) => {
                        return (
                            <View key={key}>
                                <View style={{backgroundColor:'white', height:hp('15%'), flexDirection:'row'}}>
                                    <View style={{marginLeft:wp('2%')}}>
                                        <Text style={styles.text}>{obj.name}</Text>
                                        <Text style={{fontFamily:'Poppins-ExtraBold', marginLeft:wp('6%'), color:'#c8c8c8', fontSize:wp('3%')}}>Estás más cerca de alcanzar tu meta</Text>
                                        <TouchableOpacity> 
                                            <Text style={{fontFamily:'Poppins-ExtraBold', marginLeft:wp('6%'), color:'#6dd8cb', fontSize:wp('4%'), marginTop:hp('2%')}}>+ Actualizar mi progreso</Text>
                                        </TouchableOpacity> 
                                    </View>
                                    <View style={{alignContent:'center',justifyContent:'center', marginLeft:wp('8%')}}>
                                        <TouchableOpacity onPress={() => {Editar(obj)}}>
                                            <CircularProgress
                                                radius={wp('11%')}
                                                value={obj.progress}
                                                textColor='#6dd8cb'
                                                fontSize={wp('5.5%')}
                                                valueSuffix={'%'}
                                                activeStrokeColor={'#6dd8cb'}
                                                inActiveStrokeColor={'#6dd8cb'}
                                                inActiveStrokeOpacity={0.5}
                                                activeStrokeWidth={wp('3.5%')}
                                                inActiveStrokeWidth={wp('3.5%')}
                                                duration={1000}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View style={([styles.container2,{height:hp('46.4%')}])}>
                    <View style={{width:wp('40%'), height:wp('40%'), marginTop:hp('6.5%'), alignSelf:'center', marginRight:wp('6%')}}>
                        <TouchableOpacity onPress={NewObjective}>
                            <Svg viewBox="0 5 132 132">
                                <DashboardObjetives/>
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{fontFamily:'Poppins-ExtraBold', color:'#a8a8a8', fontSize:wp('3.5%'), alignSelf:'center', marginRight:wp('3%'), marginTop:hp('1.5%')}}>Agrega un nuevo objetivo</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
        )
}

const Objectives = ({nav}) => {

    const [objectivesFound, setObjectivesFound] = useState('Initial');

    async function getObjectives(){
        const token = await AsyncStorage.getItem('@token');
        const tokenDecode = jwt_decode(token);
        const res = await axios.get(devURL()+'/api/objective/consultObjective?id='+tokenDecode.user.userId);
        if (res.data.objectives[0]!==undefined) {
            objectives = res.data.objectives;
            setObjectivesFound('Found');
        } else {
            setObjectivesFound('NotFound');
        }
    }
    
    getObjectives();

    switch (objectivesFound) {
        case 'Initial':
            return(
                <View style={{flex:1, backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:'Poppins-ExtraBold', color:'#6dd8cb'}}>Cargando objetivos...</Text>
                </View>
            );
        break;
        case 'Found':
            return withObjectives({nav});
        break;
        case 'NotFound':
            return noObjectives({nav});
        break;
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"white"
    },
    containerObjectives:{
        flex:1,
        backgroundColor:"white"
    },
    container2:{
        alignContent:'center',
        alignSelf:"center",
        width:wp('105%'),
        backgroundColor:"#e5e5e5",
        borderTopLeftRadius:50,
        borderTopRightRadius:50
    },
    text:{
        fontFamily:'Poppins-ExtraBold',
        fontSize:wp('5.5%'),
        marginLeft:wp('6%'),
        color:'#7B7B7B',
        marginTop:hp('0.7%')
    }
});

export default Objectives;