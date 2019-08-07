import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Header, Icon, Left} from 'native-base'
import firebaseConfig from "./firebaseAPI";
import {Text} from "react-native-animatable";
import bgImg from "./images/background.png";

export default class Homepage extends React.Component {
    static navigationOptions = {
        drawerIcon: () => (
            <Icon name="home"/>
        )
    };
    state = {currentUser: null};
    state = {currentUser: null};

    componentDidMount() {
        const {currentUser} = firebaseConfig.auth();
        this.setState({currentUser})
    }

    signOut = () => {
        firebaseConfig.auth().signOut().then(() => this.props.navigation.navigate('Login'))
    };

    render() {

        return (
            <ImageBackground source={bgImg} style={styles.backgroundContainer}>
                <View style={styles.container}>
                    <Header>
                        <Left>
                            <Icon name={"menu"}
                                  onPress={() => this.props.navigation.openDrawer()}
                            />
                        </Left>
                    </Header>

                    <Text>Poop</Text>
                </View>
            </ImageBackground>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundContainer: {

        width: null,
        height: null,
        flex: 1
    },
});