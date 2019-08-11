import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {createAppContainer, createDrawerNavigator, DrawerItems} from "react-navigation";
import {logout} from "../services/authServices";
import Homepage from "../Components/AppComponents/Homepage";
import Profile from "../Components/AppComponents/Profile";
import Login from "../Components/AppComponents/Login";
import SignUp from "../Components/AppComponents/SignUp";
import Loading from "../Components/AppComponents/Loading";
import React from "react";
import {Icon} from "native-base";


const {width: WIDTH} = Dimensions.get("window");

const DrawerComponents = (props) =>
    <View style={styles.safeArea}>
        <View style={styles.logo}>
        </View>
        <ScrollView>
            <DrawerItems{...props}/>
        </ScrollView>
        <View style={styles.logoutView}>
            <TouchableOpacity
                onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

        </View>
    </View>;


const TabNavigator = createDrawerNavigator({
        Home: {
            screen: Homepage,
            navigationOptions: () => {
                return {
                    drawerIcon: ({tintColor}) => (
                        <Icon name="home" styles={{fontSize: 15, color: tintColor}}/>
                    )
                }

            }
        },
        Profile: {screen: Profile},
        Login: {
            screen: Login,
            navigationOptions: () => {
                return {
                    drawerLabel: () => null,
                    drawerLockMode: 'locked-closed'
                }
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: () => {
                return {
                    drawerLabel: () => null,
                    drawerLockMode: 'locked-closed'
                }
            }
        },
        Loading: {
            screen: Loading,
            navigationOptions: () => {
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
        initialRouteName: 'Home',
        contentOptions: {
            activeTintColor: "#A8D0E6",
        }

    });

export const Application = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
    logo: {
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#243060"

    },
    safeArea: {
        flex: 1,
    },
    logoutView: {
        alignItems: "center",
        bottom: 15,
    },
    logoutText: {
        color: "#e76c6c",
        fontSize: 22,
        fontWeight: "bold"
    },
});
