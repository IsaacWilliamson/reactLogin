import firebaseConfig from "./firebaseAPI";
import navigationService from "./navigationService";


export const logout = () => {
    console.log("Logout function");
    firebaseConfig.auth().signOut()
        .then(() => navigationService.navigate('Login'))
        .catch((err) => {
            console.log(err)
        });
};


export const fireLogin = (email, password) => {
    return firebaseConfig.auth().signInWithEmailAndPassword(email, password)
};


export const fireSignUp = (email, confirmPassword) => {
    return firebaseConfig.auth().createUserWithEmailAndPassword(email.trim(), confirmPassword)

};
