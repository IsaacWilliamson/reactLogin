import {createAppContainer, createStackNavigator} from 'react-navigation';
import React, {Component} from "react";
import Login from "./Components/AppComponents/Login";
import SignUp from "./Components/AppComponents/SignUp";
import Loading from "./Components/AppComponents/Loading";
import Homepage from "./Components/AppComponents/Homepage";

const AppNavigator = createStackNavigator({
        Homepage: {screen: Homepage},
        Login: {screen: Login},
        SignUp: {screen: SignUp},

        Loading: {screen: Loading}
    },
    {
        navigationOptions: {
            header: null,
        }
    });
const Apps = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <Apps/>
        );
    }
}
