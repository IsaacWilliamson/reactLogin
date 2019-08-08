import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Body, Header, Icon, Left, Right, Title} from 'native-base'
import firebaseConfig from "./firebaseAPI";

export default class Homepage extends React.Component {

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon name="home" styles={{fontSize: 15, color: tintColor}}/>
        )
    };
    state = {currentUser: null};

    componentDidMount() {
        const {currentUser} = firebaseConfig.auth();
        this.setState({currentUser})
    }


    render() {

        return (
                <View style={styles.container}>
                    <Header style={styles.header}>
                        <Left>
                            <Icon name={"ios-arrow-back"} style={styles.menuIcon}/>
                        </Left>
                        <Body>
                            <Title style={styles.titleText}>Home</Title>
                        </Body>
                        <Right>
                            <Icon name={"menu"} style={styles.menuIcon}
                                  onPress={() => this.props.navigation.openDrawer()}
                            />
                        </Right>

                    </Header>
                </View>


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
        flex: 1,
        backgroundColor: "#EEF5DB"
    },
    header: {
        backgroundColor: "#60A7BF",
        alignItems: "center",
        textAlignVertical: "center",
        color: "rgba(255,255,255,255.7)",

    },
    menuIcon: {
        alignItems: "center",
        margin: 5,
        color: "rgba(255,255,255,255.7)",
    },
    titleText: {
        textAlign: "center",
        color: "rgba(255,255,255,255.7)",
    }
});