import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import firebaseConfig from "./firebaseAPI";
import {Body, Header, Icon, Left, Right, Title} from "native-base";

const {width: WIDTH} = Dimensions.get("window");


export default class Profile extends React.Component {
    state = {currentUser: null};

    componentDidMount() {
        const {currentUser} = firebaseConfig.auth();
        this.setState({currentUser})
    }


    render() {
        const {currentUser} = this.state;
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Icon name={"ios-arrow-back"} style={styles.menuIcon}/>
                    </Left>
                    <Body>
                        <Title style={styles.titleText}>Profile</Title>
                    </Body>
                    <Right>
                        <Icon name={"menu"} style={styles.menuIcon}
                              onPress={() => this.props.navigation.openDrawer()}
                        />
                    </Right>

                </Header>


                <Text style={{fontSize: 20}}>Email:</Text>
                <TextInput style={{color: '#298158', fontSize: 20}}>
                    {currentUser && currentUser.email}!
                </TextInput>
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