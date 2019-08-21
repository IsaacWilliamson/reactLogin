import React from 'react';
import {Button, Dimensions, Image, Linking, StyleSheet, Text, TextInput, View} from 'react-native';
import firebaseConfig from "../../services/firebaseAPI";
import {Body, Header, Icon, Left, Right, Title} from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import blankUser from "./images/user.png";


const {width: WIDTH} = Dimensions.get("window");


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoURI: null,
            currentUser: null,
            loadImage: '',
            url: '',
            change: false
        }
    };

    getImage = async (currentUser) => {
        const ref = firebaseConfig.storage().ref('images/' + currentUser);
        const url = await ref.getDownloadURL();
        return url
    };
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon name="person" styles={{fontSize: 15, active: tintColor}}/>
        )
    };

    componentWillMount() {
        const {currentUser} = firebaseConfig.auth();
        this.setState({
            currentUser,
        })

    }


    async checkCameraRollPermission() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            [
                {text: 'Settings', onPress: () => Linking.openURL('app-settings:')},
                {
                    text: 'Cancel',
                }
            ],
                this.setState({
                    hasCameraRollPermissions: false
                });
            return false
        } else {
            this.setState({
                hasCameraRollPermissions: true
            });
            return true
        }

    }

    selectImage = async () => {
        const checkPermissions = await this.checkCameraRollPermission();
        if (!checkPermissions) return;
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({photoURI: result.uri});
            this.uploadFirebase(result.uri);
        }
    };

    uploadFirebase = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var storageRef = firebaseConfig.storage().ref();
        var userID = storageRef.child('images/' + this.state.currentUser.uid);
        return userID.put(blob)
    };


    render() {
        const {currentUser} = this.state;
        this.getImage(currentUser.uid).then(result => this.setState({
            url: result
        })).catch((err) => {
            console.log("No")
        });
        return (
            <View style={styles.container}>

                <Header style={styles.header}>
                    <Left>
                        <Icon name={"ios-add-circle-outline"} style={styles.menuIcon}/>
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

                <View style={styles.container}>
                    <Image style={styles.avatar} source={this.state.url ? {uri: this.state.url} : blankUser}/>
                    <View style={styles.bodyContent}>
                        <Button title="Choose Photo" onPress={this.selectImage}/>
                        <Text style={styles.name}>BORIS BOYS</Text>
                        <Text style={styles.info}>Email:</Text>
                        <TextInput editable={this.state.change} style={{color: '#298158', fontSize: 20}}>
                            {currentUser.email}!</TextInput>
                        <Text style={styles.info}>Username</Text>
                        <TextInput editable={this.state.change} style={{color: '#298158', fontSize: 20}}>
                            {currentUser.uid}!</TextInput>
                        <Text style={styles.info}>Password</Text>
                        <TextInput editable={this.state.change} style={{color: '#298158', fontSize: 20}}>
                            *******</TextInput>

                    </View>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    colour: {
        backgroundColor: "#243060",
        height: 100,
    },
    backgroundContainer: {
        width: null,
        backgroundColor: "#EEF5DB"
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
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "rgba(255,255,255, 255)",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 60,
        backgroundColor: "#243060",
    },
    name: {
        fontSize: 22,
        color: "#4f6367",
        fontWeight: '600',
    },
    bodyContent: {
        marginTop: 200,
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    }
});