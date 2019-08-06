import React, {Component} from "react";
import * as Animatable from 'react-native-animatable';
import {Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import bgImg from "./images/background.png";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";
import email from 'react-native-email'
import firebaseConfig from "./firebaseAPI";

const {width: WIDTH} = Dimensions.get("window");

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: true,
            iconName: "eye-off",

            email: "",
            notChecked: false,
            warningEmail: "Email",

            password: "",
            confirmPassword: "",
            match: false,
            warningPass: "Confirm Password",

            placeholderEmail: "rgba(4,3,30,0.22)",
            placeholderPassword: "rgba(4,3,30,0.22)",

            shake: false
        };

    }


    validateEmail = () => {
        let text = this.state.email;
        let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@kent.ac.uk$/;
        if (reg.test(text) === false) {
            this.setState({email: ""});
            this.setState({notChecked: true});
            this.setState({warningEmail: "Not a Kent Domain..."});
            this.setState({placeholderEmail: "#DC7878"});
            return false;
        } else {
            this.setState({notChecked: false});
            this.setState({email: text})

        }
    };

    checkPasswords = () => {
        const {password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            this.setState({
                password: "",
                confirmPassword: "",
                match: true,
                warningPass: "Passwords do not match...",
                placeholderPassword: "#DC7878"
            });
            return false
        } else if ((password || confirmPassword).length < 6) {
            this.setState({
                password: "",
                confirmPassword: "",
                match: true,
                warningPass: "Must be greater than 6 characters...",
                placeholderPassword: "#DC7878"
            });
            return false
        } else {
        }
    };

    validateSignUp = () => {
        this.timeout(500).then(() => {
            this.setState({
                shake: false
            })
        });
        let result1 = this.validateEmail();
        let result2 = this.checkPasswords();
        console.log(result1);
        console.log(result2);
        if (!(result1 || result2)) {
            this.setState({shake: true})
        } else if ((result1 && result2) == true) {
            console.log("sign up");
            this.signUpFirebase()
        }
    };

    timeout = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    };

    signUpFirebase = () => {
        const {email, confirmPassword} = this.state;
        this.setState({error: '', loading: true});
        firebaseConfig.auth().createUserWithEmailAndPassword(email.trim(), confirmPassword)
            .then(function (user) {
                console.log(user)
            })
            .catch((err) => {
                console.log(err.toString())
            });

    };


    render() {
        return (

            <ImageBackground source={bgImg} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Sign Up Form</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={"email"} size={28} color={"white"} style={styles.inputIcon}
                    />
                    <TextInput
                        style={[(!this.state.notChecked) ? styles.inputCredentials : styles.invalidCredentials]}
                        placeholder={this.state.warningEmail}
                        placeholderTextColor={this.state.placeholderEmail}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={"lock-outline"} size={28} color={"white"}
                          style={styles.inputIcon}
                    />
                    <TextInput style={[(!this.state.match) ? styles.inputCredentials : styles.invalidCredentials]}
                               placeholder={this.state.warningPass}
                               placeholderTextColor={this.state.placeholderPassword}
                               underlineColorAndroid="transparent"
                               onChangeText={(text) => this.setState({password: text})}
                               value={this.state.password}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={"lock-outline"} size={28} color={"white"}
                          style={styles.inputIcon}
                    />
                    <TextInput style={[(!this.state.match) ? styles.inputCredentials : styles.invalidCredentials]}
                               placeholder={this.state.warningPass}
                               placeholderTextColor={this.state.placeholderPassword}
                               underlineColorAndroid="transparent"
                               onChangeText={(text) => this.setState({confirmPassword: text})}
                               value={this.state.confirmPassword}
                    />
                </View>
                <TouchableOpacity style={styles.buttonLogin}
                                  onPress={this.validateSignUp.bind(this)}
                >
                    <Animatable.Text animation={this.state.shake ? 'shake' : undefined} style={styles.loginText}>Sign
                        Up</Animatable.Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const
    styles = StyleSheet.create({
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
        invalidCredentials: {
            width: WIDTH - 55,
            height: 45,
            borderBottomWidth: 2,
            borderColor: "#DC7878",
            fontSize: 16,
            paddingLeft: 60,
            color: "rgba(255,255,255,255.7)",
            marginTop: 15

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