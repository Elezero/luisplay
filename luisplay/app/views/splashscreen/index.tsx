import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { LogBox } from 'react-native';




interface IProps {
    navigation: any
}
interface IState {

}
export default class SplashScreen extends Component<IProps, IState> {
    constructor(props: any){
        super(props);
    }

    render(): React.ReactNode {
        return(
            <View style={{flex: 1, backgroundColor: '#fff'}} >
                <LottieView source={require('../../assets/animations/splash_anination.json')} 
                    autoPlay 
                    onAnimationFinish = {() => {
                        console.log("Animation finish");
                        this.props.navigation.replace('loginScreen');
                    }}
                    loop={false} />
            </View>
        )
    }

    componentDidMount(){
    }
}