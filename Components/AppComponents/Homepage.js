import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Body, Header, Icon, Left, Right, Title} from 'native-base'
import firebaseConfig from "../../services/firebaseAPI";

export default class Homepage extends React.Component {
    s;
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
        backgroundColor: "rgba(255,255,255,255.7)",
    },
    header: {
        backgroundColor: "#243060",
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