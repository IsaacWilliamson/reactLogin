import {createAppContainer, createStackNavigator} from 'react-navigation';
import React, {Component} from "react";
import login from "./Components/AppComponents/login";
import SignUp from "./Components/AppComponents/SignUp";

const AppNavigator = createStackNavigator({
        Home: {screen: login},
        SignUp: {screen: SignUp}
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
