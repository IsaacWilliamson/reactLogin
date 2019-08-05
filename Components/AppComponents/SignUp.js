import React, {Component} from "react";
import {Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import bgImg from "./images/background.png";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";

const {width: WIDTH} = Dimensions.get("window");

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: true,
            iconName: "eye-off"
        };
    }

    render() {
        return (

            <ImageBackground source={bgImg} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Sign Up Form</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={"email"} size={28} color={"white"} style={styles.inputIcon}
                    />
                    <TextInput style={styles.inputCredentials} placeholder={"Email"}
                               underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={"account"} size={28} color={"white"} style={styles.inputIcon}
                    />
                    <TextInput style={styles.inputCredentials} placeholder={"Username"}
                               underlineColorAndroid="transparent"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={"lock-outline"} size={28} color={"white"}
                          style={styles.inputIcon}
                    />
                    <TextInput style={styles.inputCredentials}
                               placeholder={"Password"}
                               underlineColorAndroid="transparent"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={"lock-outline"} size={28} color={"white"}
                          style={styles.inputIcon}
                    />
                    <TextInput style={styles.inputCredentials}
                               placeholder={"Confirm Password"}
                               underlineColorAndroid="transparent"
                    />
                </View>

                <TouchableOpacity style={styles.buttonLogin}>
                    <Text style={styles.loginText}>Sign Up</Text>
                </TouchableOpacity>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: "center",
        alignItems: "center"
    },
    logoContainer: {
        alignItems: "center"
    },
    logoText: {
        color: "white",
        marginTop: 5,
        marginBottom: 40,
        fontSize: 30,
        alignItems: "center",
        fontWeight: "600"
    },
    logoImage: {
        width: 120,
        alignItems: "center",
        height: 120
    },
    inputCredentials: {
        width: WIDTH - 55,
        height: 45,
        borderBottomWidth: 2,
        borderColor: "rgba(0,0,0,0.35)",
        fontSize: 16,
        paddingLeft: 60,
        color: "rgba(255,255,255,255.7)",
        marginTop: 15
    },
    inputContainer: {
        marginTop: 10
    },
    inputIcon: {
        position: "absolute",
        top: 22,
        left: 15
    },
    viewPassword: {
        position: "absolute",
        right: 15,
        top: 22
    },
    buttonLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        justifyContent: "center",
        marginTop: 60,
        backgroundColor: "#298158"
    },
    loginText: {
        color: "white",
        fontSize: 18,
        textAlign: "center"
    }
});