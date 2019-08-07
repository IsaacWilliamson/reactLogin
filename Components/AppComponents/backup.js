import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import firebaseConfig from "./firebaseAPI";

const {width: WIDTH} = Dimensions.get("window");


export default class Backup extends React.Component {
    state = {currentUser: null};

    componentDidMount() {
        const {currentUser} = firebaseConfig.auth();
        this.setState({currentUser})
    }


    render() {
        const {currentUser} = this.state;
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 20}}> Welcome Back!
                    <Text style={{color: '#298158', fontSize: 20}}>
                        {currentUser && currentUser.email}!
                    </Text></Text></View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});