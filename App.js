import navigationService from "./services/navigationService";
import React from "react";
import {Application} from "./drawerNavigation/drawer";
import firebaseConfig from "./services/firebaseAPI";


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
    }


    render() {
        return (
            <Application
                ref={navigatorRef => {
                    navigationService.setTopLevelNavigator(navigatorRef)
                }}/>

        )
    }
}

