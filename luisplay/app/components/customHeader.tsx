import React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions, Appearance } from "react-native";
import Colors from '../styles/colors';


// ASSETS 
    // IMAGES
    const icon_search = (Appearance.getColorScheme() === 'dark' )? 
                            require("../assets/images/icon_search_dark.png") 
                            : require("../assets/images/icon_search.png");
    const icon_close = (Appearance.getColorScheme() === 'dark' )? 
                            require("../assets/images/icon_close_dark.png") 
                            : require("../assets/images/icon_close.png");
    // STYLES


interface IProps {
    isSearching: boolean,
    headerTitle: any,
    setTextSearching: any,
    toggleSearching: any,

}
interface IState {
    isSearching: boolean,
    textSearching: string,
}

class CustomHeader extends Component<IProps, IState> {
    constructor(props: any){
        super(props);

        this.state = {
            isSearching: false,
            textSearching: "",
        };


        // Bind functions
    }

    toggleSearching(){
        const { isSearching } = this.state;

        this.setState({ isSearching: !isSearching });
    }

    render () {
        return (
            <View style={styles.headerView}>
                <View style={styles.header_tiles} >
                    { this.props.isSearching && 
                        <TextInput 
                                style={styles.searchTextInput} 
                                value={this.state.textSearching}
                                onChangeText={val => {
                                    this.setState({textSearching: val});
                                    this.props.setTextSearching(val);
                                }}
                                placeholder={"Search"}
                                autoCorrect={false}
                            />
                    }
                    { !this.props.isSearching && 
                        <View style={styles.searchDivEmpty} >
                            <Image source={this.props.headerTitle} style={styles.searchDivEmptyTitle} />
                        </View>
                    }
                    
                    <TouchableOpacity style={styles.searchButton} onPress={() => this.props.toggleSearching() }>
                        <Image source={this.props.isSearching? icon_close : icon_search} style={styles.headerImages} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    /* CUSTOM HEADER */
    headerView: {
        width: '100%', 
        height: 60, 
        justifyContent: 'center',
        //elevation: 10,
        //zIndex: 100,
        backgroundColor: Colors.HEADER_COLOR,
    },
    headerImages: {
        width: 24, 
        height: 24, 
        marginHorizontal: 14 ,
    },
    header_tiles: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginHorizontal: 10,
        marginVertical: 2, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchTextInput: {
        color: Colors.INPUT_TEXT_PLACEHOLDER,
        borderWidth: 1,
        borderColor: Colors.INPUT_TEXT_BORDER,
        width: Dimensions.get('window').width - 72,
        backgroundColor: Colors.INPUT_TEXT_BACKGROUND,
        borderRadius: 10,
        textAlign: 'center',
        height: 40,
    },
    searchDivEmpty: {
        height: 40,
        width: Dimensions.get('window').width - 72,
        justifyContent: 'center',
    },
    searchDivEmptyTitle: {
        height: 32,
        width: 56,
        alignSelf: 'auto',
        resizeMode: 'contain'
    },
    searchButton: {
        right: 1
    }
});

export default CustomHeader;