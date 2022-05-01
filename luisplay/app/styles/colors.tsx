import { Appearance } from 'react-native';


class Colors {
    static PRIMARY_COLOR = "#d40000";
    static CONTAINER_COLOR = (Appearance.getColorScheme() === 'dark')? "#000" : "#FFF";
    static TITLE_COLOR = (Appearance.getColorScheme() === 'dark')? "#CCC" : "#000";
    static HEADER_COLOR = (Appearance.getColorScheme() === 'dark')? "#000" : "#FFF";
    static LOADING_INDICATOR_BACKGROUND = (Appearance.getColorScheme() == 'dark')? "#000" : "#FFF";
    static LABEL = (Appearance.getColorScheme() === 'dark')? "#CCC" : "#000";
    static INPUT_TEXT_PLACEHOLDER = (Appearance.getColorScheme() === 'dark')? "#CCC" : "#000";
    static INPUT_TEXT_BACKGROUND = (Appearance.getColorScheme() === 'dark')? "#333" : "#EEE";
    static INPUT_TEXT_BORDER = (Appearance.getColorScheme() === 'dark')? "#222" : '#DDDDDD';
    static SHADOW_COLOR = (Appearance.getColorScheme() === 'dark')? "#FFF" : "#000";
    static CARD_BACKGROUND_COLOR = (Appearance.getColorScheme() === 'dark')? "#000" : "#FFF";
    static CARD_TEXT = (Appearance.getColorScheme() === 'dark')? "#777" : "#000";
    static BUTTON_SECONDARY_COLOR = (Appearance.getColorScheme() === 'dark')? "#444" : '#CDCDCD';
    static BUTTON_SECONDARY_TEXT_COLOR = (Appearance.getColorScheme() === 'dark')? "#444" : '#CDCDCD';
    static CARD_TABLE_TILES = (Appearance.getColorScheme() === 'dark')? "#111" : '#FFF';
    static CARD_TABLE_TILES_TEXT = (Appearance.getColorScheme() === 'dark')? "#AAA" : '#555';
    static MODAL_BORDER_COLOR = (Appearance.getColorScheme() === 'dark')? "#333" : '#DDD';
    


}


export default Colors;