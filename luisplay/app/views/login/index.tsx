import React from "react";
import { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image,
    ScrollView, SafeAreaView, ActivityIndicator, Appearance, ImageProps } from 'react-native';
    

// API 
import login from '../../api/login';

// MODELS/INTERFACES
import IToken from "../../models/token";


// UTILS
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

// COLORS 
import Colors from '../../styles/colors';

// ASSETS 
    // IMAGES
    const img_icon = (Appearance.getColorScheme() === 'dark' )? 
            require("../../assets/images/icon_transparent_dark.png") 
            : require("../../assets/images/icon_transparent.png");  
    // STYLES
    const globalStyles = require('../../styles/globalStyles');


interface IProps {
    navigation: any
}
interface IState {
    Email?: string;
    Password?: string;
    isLoading?: boolean;
}

class Login extends Component<IProps, IState> {
    constructor(props: any){
        super(props);

        this.state = {
            Email: '',
            Password: '',
            isLoading: false,
        };

        // Bind functions
        this.performLogin = this.performLogin.bind(this);
        this.showToast = this.showToast.bind(this);
    }


    showToast(_type: any , _title: any, _text: any){
        Toast.show({
            type: _type,
            text1: _title,
            text2: _text
            })
    }

    performLogin() {
        const { Email, Password } = this.state;

        if(Email == null || Password == null) {
            this.showToast("error", "Error", "complete_all_fields")

            return;
        }

        this.setState( {isLoading: true });

        console.log("LOGIN");
        login.post("", {
            email: Email,
            password: Password
        }).then((response_login: IToken) => {
            console.log({response_login});
            // SAVING NAME TO SESION
            AsyncStorage.setItem("user_name", response_login.token);
                                
            // GOING TO MAIN SCREENS
            this.props.navigation.replace('exploreScreen');

        }).catch((ex: { response: { status: number; }; }) => {
            const error =
            ex.response.status === 404
              ? "Resource Not found"
              : "An unexpected error has occurred";
              
            console.log("Error");
            console.log(error);

            this.showToast("error", "Error", "Invalid credentials")
            
            this.setState({ isLoading: false });
        });

        
    }

    

    

    render() {
        const { Email, Password } = this.state; 
        const { isLoading } = this.state;
            
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={globalStyles.subcontainer_toast}>
                        <Toast />
                    </View>
                    

                    <Text style={globalStyles.title}>
                        {"Login"}
                    </Text>



                    <Image source={img_icon} style={globalStyles.logoImg} />

                    <View style={globalStyles.formControl} >
                        <Text style={globalStyles.label}>{"Email"}</Text>
                        <TextInput 
                            style={globalStyles.textInput} 
                            value={Email}
                            onChangeText={val => this.setState({Email: val})}
                            placeholder={"Email"}
                            keyboardType='email-address'
                            textContentType="emailAddress"
                        />
                    </View>
                    <View style={globalStyles.formControl} >
                        <Text style={globalStyles.label}>{"Password"}</Text>
                        <TextInput 
                            style={globalStyles.textInput} 
                            value={Password}
                            onChangeText={val => this.setState({Password: val})}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            autoCorrect={false}
                            textContentType="password"
                        />
                    </View>

                    

                    <View style={styles.subcontainer}>
                        <TouchableOpacity 
                            style={globalStyles.btn_primary}
                            onPress={this.performLogin}
                        >
                            <Text style={globalStyles.btn_primary_text}>{"Login"}</Text>
                        </TouchableOpacity>
                        <ActivityIndicator animating={isLoading}  size="large" color={Colors.PRIMARY_COLOR}/>
                    </View>

                    
                </ScrollView>
            </SafeAreaView>
            
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.CONTAINER_COLOR,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    subcontainer: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
    },
    subcontainer_top_margined: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    scrollView: {

    }
});


export default Login;