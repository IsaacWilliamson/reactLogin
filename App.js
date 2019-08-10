import {createAppContainer, createDrawerNavigator, DrawerItems} from 'react-navigation';
import React from "react";
import Login from "./Components/AppComponents/Login";
import SignUp from "./Components/AppComponents/SignUp";
import Loading from "./Components/AppComponents/Loading";
import Homepage from "./Components/AppComponents/Homepage";
import Profile from "./Components/AppComponents/Profile";
import {Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import firebaseConfig from "./Components/AppComponents/firebaseAPI";

const {width: WIDTH} = Dimensions.get("window");

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
        };
    };


    componentDidMount() {
        firebaseConfig.auth().onAuthStateChanged((authenticated) => {
            authenticated ? this.setState(() => ({
                authenticated: true,
            })) : this.setState(() => ({
                authenticated: false,
            }));
        });
        console.log(this.state.authenticated)
    }


    logout = () => {
        console.log("here");
        firebaseConfig.auth().signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch((err) => {
                console.log(err)
            });
    };

    render() {
        //const {currentUser} = this.state
        return (
            <Application/>

        )
    }
}


const DrawerComponents = (props) =>
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.logo}>
        </View>
        <ScrollView>
            <DrawerItems{...props}/>
            <View style={{flex: 1}}>
                <Button title="Logout" onPress={() => this.logout}/>
            </View>
        </ScrollView>
    </SafeAreaView>;


const TabNavigator = createDrawerNavigator({
        Home: {screen: Homepage},
        Profile: {screen: Profile},
        Login: {
            screen: Login,
            navigationOptions: ({navigation}) => {
                return {
                    drawerLabel: () => null,
                    drawerLockMode: 'locked-closed'
                }
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: ({navigation}) => {
                return {
                    drawerLabel: () => null,
                    drawerLockMode: 'locked-closed'
                }
            }
        },
        Loading: {
            screen: Loading,
            navigationOptions: ({navigation}) => {
                return {
                    drawerLabel: () => null,
                    drawerLockMode: 'locked-closed'
                }
            }
        },
    },

    {
        headerMode: null,
        contentComponent: DrawerComponents,
        drawerWidth: WIDTH,
        drawerPosition: "right",
        initialRouteName: 'Login',
        contentOptions: {
            activeTintColor: "#f8e9a1"
        }

    });

const Application = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
    logo: {
        height: 80,
        justifyContent: "center",
        alignItems: "center",

    },
    safeArea: {}
});

