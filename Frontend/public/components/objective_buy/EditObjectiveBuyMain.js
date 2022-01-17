import React, {useState} from "react"; 
import { Animated, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import SidebarIcon from '../../assets/images/sidebar_icon.svg';
import Character from '../../assets/images/character.svg';
import Svg from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EditObjectiveBuy1 from "./EditObjectiveBuy1";
import EditObjectiveBuy2 from "./EditObjectiveBuy2";
import EditObjectiveBuy3 from "./EditObjectiveBuy3";
import EditObjectiveBuy4YES from "./EditObjectiveBuy4YES";
import EditObjectiveBuy5 from "./EditObjectiveBuy5";
import EditObjectiveBuy4NO from "./CreateNewObjectiveBuy4NO";
import { ScrollView } from "react-native-gesture-handler";

const EditObjectiveBuyMain = ({route, nav}) => {

    const objective = {
        "objectiveId":route.params.objectiveId,
        "name":route.params.name,
        "description":route.params.description,
        "type":route.params.type,
        "metaData":route.params.metaData
    }

    const [altura, setAltura] = useState(73.9); 
    const [screen, setScreen] = useState('1');

    function Screens () {
        switch (screen) {
            case '1':
                return( <EditObjectiveBuy1 setScreen={setScreen} obj={objective}/> );
            break;
            case '2':
                return( <EditObjectiveBuy2 obj={objective} setScreen={setScreen}/>);
            break;
            case '3':
                return( <EditObjectiveBuy3 setScreen={setScreen}/>); 
            break;
            case '4YES':
                return( <EditObjectiveBuy4YES obj={objective} setScreen={setScreen}/>); 
            break;
            case '4NO':
                return( <EditObjectiveBuy4NO nav={nav}/>); 
            break;
            case '5':
                return( <EditObjectiveBuy5 obj={objective} nav={nav}/>); 
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
                            <Text style={{fontSize:wp('5%'), fontFamily:'Poppins-Bold', color:'#7b7b7b'}}>Editar Objetivo</Text>
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

export default EditObjectiveBuyMain;