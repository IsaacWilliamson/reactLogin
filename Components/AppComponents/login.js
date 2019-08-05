import React, {Component} from "react";
import {Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import bgImg from "./images/background.png";
import logoImg from "./images/logo.png";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";

const {width: WIDTH} = Dimensions.get("window");

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: true,
            iconName: "eye-off"
        };
    }

    iconPress = () => {
        let iconName = (this.state.showPassword) ? "eye" : "eye-off";
        this.setState({
            showPassword: !this.state.showPassword,
            iconName: iconName
        });
    };

    render() {
        return (

            <ImageBackground source={bgImg} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logoImg} style={styles.logoImage}/>
                    <Text style={styles.logoText}>Time Map</Text>
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
                    <TextInput{...this.props}
                              style={styles.inputCredentials} placeholder={"Password"}
                              secureTextEntry={this.state.showPassword}
                              underlineColorAndroid="transparent"
                    />

                    <TouchableOpacity style={styles.viewPassword}
                                      onPress={this.iconPress}>
                        <Icon name={this.state.iconName} size={28}
                              color={"white"}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.buttonLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.signUp}>
                    <Text Style={styles.signUpText} onPress={() => this.props.navigation.navigate('SignUp')}
                          title="SignUp">
                        Don't have an account? Sign Up!
                    </Text>
                </View>
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
        marginTop: 10,
        fontSize: 20,
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
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 60,
        backgroundColor: "rgba(0,0,0,0.35)",
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
        color: "rgba(255,255,255, 0.7)",
        fontSize: 18,
        textAlign: "center"
    },
    signUp: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
    signUpText: {
        color: "white",
        fontSize: 16,
    }
});
