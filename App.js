import {createAppContainer, createDrawerNavigator, DrawerItems} from 'react-navigation';
import React from "react";
import Login from "./Components/AppComponents/Login";
import SignUp from "./Components/AppComponents/SignUp";
import Loading from "./Components/AppComponents/Loading";
import Homepage from "./Components/AppComponents/Homepage";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import logoImg from "./Components/AppComponents/images/logoHeader.png";

const {width: WIDTH} = Dimensions.get("window");

export default class Drawer extends React.Component {

    render() {
        //const {currentUser} = this.state
        return (
            <App/>

        )
    }
}


const DrawerComponents = (props) =>
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.logo}>
            <Image source={logoImg}/>
        </View>
        <ScrollView>
            <DrawerItems{...props}/>
        </ScrollView>
    </SafeAreaView>;


const TabNavigator = createDrawerNavigator({
        Home: {screen: Homepage},
        Login: {
            screen: Login,
            navigationOptions: {
                drawerLockMode: 'locked-closed'
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                drawerLockMode: 'locked-closed'
            }
        },
        Loading: {
            screen: Loading,
            navigationOptions: {
                drawerLockMode: 'locked-closed'
            }
        },
    },
    {
        contentComponent: DrawerComponents,
        drawerWidth: WIDTH,
        headerMode: 'none',
        // initialRouteName: 'Login'
        title: 'Main',
        headerTintColor: '#4589d9',
    });

const App = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
    logo: {
        height: 80,
        justifyContent: "center",
        alignItems: "center"
    },
});

