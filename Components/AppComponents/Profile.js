import React from 'react';
import {Button, Dimensions, Image, Linking, StyleSheet, Text, TextInput, View} from 'react-native';
import firebaseConfig from "../../services/firebaseAPI";
import {Body, Header, Icon, Left, Right, Title} from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";


const {width: WIDTH} = Dimensions.get("window");


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoURI: null,
            currentUser: null,
            loadImage: ''
        }
    };

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon name="person" styles={{fontSize: 15, active: tintColor}}/>
        )
    };


    componentWillMount() {
        const {currentUser} = firebaseConfig.auth();
        this.setState({currentUser})
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

    uploadFirebase = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var storageRef = firebaseConfig.storage().ref();
        var userID = storageRef.child('images/' + this.state.currentUser.uid);
        return userID.put(blob)
    };



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

                <View style={styles.container}>
                    <View style={styles.border}></View>
                    <Image style={styles.avatar} source={{uri: undefined}}/>
                    <Button title="Choose Photo" onPress={this.selectImage}/>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>John Doe</Text>
                        <Text style={{fontSize: 20}}>Email:</Text>
                        <TextInput style={{color: '#298158', fontSize: 20}}>
                            {currentUser && currentUser.email}!</TextInput>
                        <Text style={styles.info}>Username</Text>
                        <TextInput style={{color: '#298158', fontSize: 20}}>
                            {currentUser && currentUser.uid}!</TextInput>

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
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "#4f6367",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 60
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
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