import React, {Component} from "react";
import {ActivityIndicator, ImageBackground, StyleSheet, View} from 'react-native';
import firebaseConfig from "./firebaseAPI";
import bgImg from "./images/background.png";

export default class Loading extends Component {

    componentDidMount() {
        firebaseConfig.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Home' : 'SignUp');
        })
    }

    render() {
        return (
            <ImageBackground source={bgImg} style={styles.backgroundContainer}>
                <View style={styles.container}>
                    <ActivityIndicator color="white" size="large"/>
                </View>
            </ImageBackground>
        )
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});