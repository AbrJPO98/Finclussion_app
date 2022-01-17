import React, {useState} from "react";
import { Animated, View, StyleSheet, Keyboard } from "react-native";
import BottomBar from "./BottomBar";
import NavBar from "./NavBar";
import Objectives from "./Objectives";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AllTransactions from "./AllTransactions";
import BankAccount from "./BankAccount";
import RewardsOffers from "./RewardsOffers";
import Settings from "./Settings";
import NewPay from "./NewPay";
import SelectNewObjective from "./SelectNewObjective";
import EditObjectiveBuyMain from "./objective_buy/EditObjectiveBuyMain";
import CreateNewObjectiveBuyMain from "./objective_buy/CreateNewObjectiveBuyMain";
import { getLog } from "../isLogin";
import Profile from "./Profile";
import { navigationRef } from "./NavigationRef";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomDrawer from './Drawer'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle,faHistory,faTag,faUser,faInbox } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const NewPayment = () => {
    return(
        <View style={{flex:1}}>
            <NewPay />
        </View>
    );
}

const CreateObjectiveBuy = ({navigation}) => {
    return(
        <View style={{flex:1}}>
            <CreateNewObjectiveBuyMain nav={navigation} />
        </View>
    );
}

const EditObjectiveBuy = ({route, navigation}) => {
    return(
        <View style={{flex:1}}>
            <EditObjectiveBuyMain route={route} nav={navigation} />
        </View>
    );
}

const UProfile = ({route, navigation}) => {
    return(
        <View style={{flex:1}}>
            <Profile nav={navigation} route={route}/>
        </View>
    );
}

const NewObjective = ({navigation}) => {

    return(
        <View style={{flex:1}}>
            <View style={{flex:0.325}}>
                <NavBar nav={navigation}/>
            </View>
            <View style={{flex:1.05}}>
                <SelectNewObjective nav={navigation} />
            </View>
        </View>
    );
}

const Altrnscc = () => {
    return(
        <View style={{flex:1}}>
            <AllTransactions />
        </View>
    );
}

const BnkAcc = () => {
    return(
        <View style={{flex:1}}>
            <BankAccount />
        </View>
    );
}

const ReOff = () => {
    return(
        <View style={{flex:1}}>
            <RewardsOffers />
        </View>
    );
}

const Sttngs = () => {
    return(
        <View style={{flex:1}}>
            <Settings />
        </View>
    );
}

const Init = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <View style={{flex:0.325}}>
                <NavBar nav={navigation} />
            </View>
            <View style={{flex:1.05}}>
                <Objectives nav={navigation}/>
            </View>
        </View>
    );
}
 
const Dashboard = ({route, nav}) => {
        const iconSize = wp('6.5%');
    
        const initialAnimBottomBar = 0;
    
        const animBottomBar = new Animated.Value(initialAnimBottomBar);
    
        Keyboard.addListener('keyboardDidShow', () => {hideBottomBar()});
        Keyboard.addListener('keyboardDidHide', () => {showBottomBar()});
    
        const showBottomBar = () => {
            Animated.timing(animBottomBar, {
                toValue:0, 
                duration:500,  
                useNativeDriver:true
            }).start();
        }
        
        const hideBottomBar = () => {
            Animated.timing(animBottomBar, {
                toValue:300, 
                duration:500,  
                useNativeDriver:true
            }).start();
        }
        
        return (
            <View >
                <View style={{width:wp('100%')}}/>
                    <NavigationContainer independent={true} ref={navigationRef}>
                        <Drawer.Navigator
                            screenOptions={{
                                drawerItemStyle:{marginVertical:hp('-0.25%'), marginLeft:wp('7.5%')},
                                drawerLabelStyle:{color:'white', fontFamily:'Poppins-Bold', fontSize:wp('4.5%')},
                                headerShown:false,
                                drawerActiveBackgroundColor:null,
                                drawerStyle:{backgroundColor:'#6dd8cb', width:wp('100%')}
                            }}
                            drawerContent={(props)=> <CustomDrawer {...props}/>}>
                            <Drawer.Screen name="Initial" component={Init} options={{drawerLabel:'Initial', drawerItemStyle:{marginBottom:hp('-7%'), marginRight:wp('100%')}, unmountOnBlur:true}}/>
                            <Drawer.Screen name="Nuevo Pago" component={NewPayment} options={{drawerIcon:(props) => (<FontAwesomeIcon style={styles.icon} size={iconSize} icon={faPlusCircle} />)}}/>
                            <Drawer.Screen name="Cuentas Bancarias" component={BnkAcc} options={{drawerIcon:(props) => (<FontAwesomeIcon style={styles.icon} size={iconSize} icon={faInbox} />)}}/> 
                            <Drawer.Screen name="Todas las transacciones" component={Altrnscc} options={{drawerIcon:(props) => (<FontAwesomeIcon style={styles.icon} size={iconSize} icon={faHistory} />)}}/>
                            <Drawer.Screen name="Recompensas y ofertas" component={ReOff} options={{drawerIcon:(props) => (<FontAwesomeIcon style={styles.icon} size={iconSize} icon={faTag} />)}}/>
                            <Drawer.Screen name="Configuraciones" component={Sttngs} options={{drawerIcon:(props) => (<FontAwesomeIcon style={styles.icon} size={iconSize} icon={faUser} />)}}/>
                            <Drawer.Screen name="SelectNewObjective" component={NewObjective} options={{drawerItemStyle:{marginBottom:hp('-7%'), marginRight:wp('100%')}}}/>
                            <Drawer.Screen name="CreateNewObjectiveBuyMain" component={CreateObjectiveBuy} options={{drawerItemStyle:{marginBottom:hp('-7%'), marginRight:wp('100%')}, unmountOnBlur:true}}/>
                            <Drawer.Screen name="EditObjectiveBuyMain" component={EditObjectiveBuy} options={{drawerItemStyle:{marginBottom:hp('-7%'), marginRight:wp('100%')}, unmountOnBlur:true}}/>
                            <Drawer.Screen name="UserProfile" component={UProfile} options={{drawerItemStyle:{marginBottom:hp('-7%'), marginRight:wp('100%')}, unmountOnBlur:true}}/>
                        </Drawer.Navigator>
                    </NavigationContainer>
                    <Animated.View style={{height:hp('10%'), marginTop:hp('84%'), position:'absolute', transform:[{translateY:animBottomBar}]}}>
                        <BottomBar nav={nav}/>
                    </Animated.View>
            </View>
        );
}

const styles = StyleSheet.create({
    icon:{
        color:'white',
        marginBottom:hp('0.7%')
    }
})

export default Dashboard;