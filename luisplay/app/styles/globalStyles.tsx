'use strict';
import { Dimensions, StyleSheet } from 'react-native';

import Colors from './colors';


module.exports = StyleSheet.create({
    subcontainer_toast: {
        width: '100%',
        zIndex: 100000
    },
    title: {
        color: '#777777',
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 10,
        marginBottom: 30,
        marginLeft: 20,
    },
    formControl: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },  
    label: {
        color: Colors.LABEL,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    textInput: {
        color: Colors.INPUT_TEXT_PLACEHOLDER,
        borderWidth: 1,
        borderColor: Colors.INPUT_TEXT_BORDER,
        width: '100%',
        height: 40,
        backgroundColor: Colors.INPUT_TEXT_BACKGROUND,
        borderRadius: 10,
        textAlign: 'center',
    },
    logoImg: {
        width: '50%',
        height: 160,
        marginBottom: 40,
        alignSelf: 'center', 
        resizeMode: 'contain'
    },
    btn_primary: {
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 40,
        padding: 15,
        width: '60%',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: "center"
    },
    btn_primary_text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    btn_opaque: {
        backgroundColor: 'transparent',
    },
    btn_opaque_text: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btn_opaque_text_secondary : {
        color: '#999999',
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
    },
    label_centered: {
        textAlign: 'center',
        marginTop: 20,
        color: Colors.LABEL,
    },
    btn_secondary: {
        backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
        alignSelf: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,

    },
    btn_secondary_text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
    },


    



    /* PICKER */
    picker: {
        height: 40, 
        width: '100%', 
        backgroundColor: Colors.PRIMARY_COLOR,
        color: 'white'
    },
    pickerContainer: {
        backgroundColor: Colors.PRIMARY_COLOR,
        //borderColor: 'green',
        //borderWidth: 2,
        borderRadius: 20,
        width: '82%',
        alignSelf: 'center',
        height: 60,
        paddingHorizontal: 10,
        paddingVertical: 4,
        justifyContent: 'center',
        marginVertical: 10,
    },
    pickerItem: {
        backgroundColor: "grey", 
        color: "blue", 
        fontFamily:"Ebrima", 
        fontSize:17
    },



    /*   FLAT LIST   */
    listHeader: {
        backgroundColor: Colors.HEADER_COLOR,
    },
    listFooter: {
        height: 60,
    },
    listHeaderTitle: {
        fontSize: 34,
        color: Colors.TITLE_COLOR,
        paddingLeft: 20,
        paddingBottom: 8,
        fontWeight: 'bold',
        width: '100%',
    },

    /*    MINI CARD STYLE  */
    miniCardStyle: {
        shadowColor       : Colors.SHADOW_COLOR,
        shadowOffsetWidth : 2,
        shadowOffsetHeight: 2,
        shadowOpacity     : 0.1,
        hadowRadius       : 5,
        bgColor           : Colors.CARD_BACKGROUND_COLOR,
        margin            : 5,
        borderRadius      : 10,
        elevation         : 3,
        width             : (Dimensions.get("screen").width / 2) - 10,
        flexWrap: 'nowrap', 
        textColor: 'red',
    },
    card_title: {
        color: Colors.CARD_TEXT
    },
    card_table_tiles: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginVertical: 2, 
    },
    card_table_tile_image: {
        height:  '100%',
        width: 16,
        opacity: 0.7,
        resizeMode: 'contain',
        marginRight: 13,
        marginLeft: 3,
    },
    card_table_tile_text: {
        color: Colors.CARD_TABLE_TILES_TEXT,
        fontSize: 14,
        //fontWeight: 'bold',
        width: Dimensions.get('window').width - 100
    },



    /* LOADING INDICATOR */
    loadingIndicator: {
        marginTop: 80, 
        position: 'absolute', 
        zIndex: 30, 
        alignSelf: 'center', 
        backgroundColor: Colors.LOADING_INDICATOR_BACKGROUND, 
        borderRadius: 30, 
        padding: 6 
    },
});