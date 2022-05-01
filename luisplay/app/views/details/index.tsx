import React from 'react';
import { PureComponent} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, FlatList,
            ScrollView, SafeAreaView, Image, Dimensions, Appearance, ImageBackground, LogBox } from 'react-native';

import { CardViewWithImage } from "react-native-simple-card-view";

// MODELS/INTERFACES
import IMovie from '../../models/movie';

// SETTINGS
import Configs from '../../settings/configs';

// API 
import movies_service from '../../api/movies';

// UTILS

// COLORS 
import Colors from '../../styles/colors';
import IMovies from '../../models/movies';


// ASSETS 
    // IMAGES
        const img_star_filled = (Appearance.getColorScheme() === 'dark' )? 
                            require("../../assets/images/img_star_filled_dark.png") 
                            : require("../../assets/images/img_star_filled.png");
        const img_back_arrow = require("../../assets/images/img_back_arrow.png");
        
       

    // STYLES
        const globalStyles = require('../../styles/globalStyles');
    


interface IProps {
    navigation: any,
    route: any,
}
        
interface IState {
    id: string,
    isLoading: boolean,
    movie: IMovie,
    suggestedMovies: IMovie[],
}

class Details extends PureComponent<IProps, IState> {
    constructor(props: IProps | Readonly<IProps>){
        super(props);

        this.state = {
            id: '',
            isLoading: false,
            movie: {} as IMovie,
            suggestedMovies: [],
        };


        // Bind functions
        this.getPlace = this.getPlace.bind(this);
        this.getSuggestedMovies = this.getSuggestedMovies.bind(this);
    }

    componentDidMount(){
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        
        //Obteniendo objetos enviados desde vista anterior
        const id = this.props.route.params.params.id;
        console.log(this.props);
        this.setState(
            {
                id: id, 
                isLoading: true,
            }, 
            () => {
                    this.getPlace();
        });
    }
    getPlace(){
        const { id } = this.state;
        console.log("getting: "+id);

        movies_service.getDetails('movie/', id)
            .then((response_movie: IMovie) => {
                console.log({response_movie});
                
                this.setState({
                    movie: response_movie,
                    isLoading: false,
                }, ()=> {
                    this.getSuggestedMovies();
                })
    
            }).catch((error: any) => {
                  
                console.log(error);
                
                this.setState({ isLoading: false });
            });


    }


    getSuggestedMovies(){
        const { id } = this.state;

        movies_service.getSimilar('movie/'+id+'/similar')
        .then((response_movies_list: IMovies) => {
            console.log({response_movies_list});
            
            this.setState({
                suggestedMovies: response_movies_list.results,
            }, ()=> {
                
            })

        }).catch((error: any) => {
                
            console.log(error);
            
        });
        
    }

    render() {
        const { isLoading, movie, suggestedMovies } = this.state;

        if  ( movie == null )
            return (<View></View>);

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>

                    { isLoading &&
                    <ActivityIndicator animating={isLoading}  size="large" color={Colors.PRIMARY_COLOR} style={globalStyles.loadingIndicator}/>
                    }

                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}  style={styles.btn_backArrow}>
                        <Image source={img_back_arrow} style={styles.btn_backArrow_img} />
                    </TouchableOpacity>

                    
                    <View style={styles.header_images} >

                        
                        <ImageBackground blurRadius={90} source={{uri: Configs.MOVIEDB_POSTERS_PATH + movie.poster_path}}>
                            <Image source={{uri: Configs.MOVIEDB_POSTERS_PATH + movie.poster_path}} style={styles.image_poster} />
                        </ImageBackground>
                    </View>

                    <Text style={styles.title}>{movie.title}</Text>
                    

                    

                    {/* CARD INFO  */}
                    <View style={styles.table_tiles_container} >
                        <View style={styles.header_tiles}>
                            <View style={styles.header_tiles_col_left} >
                                <Text style={ styles.tile_text_type }>{ movie.tagline}</Text>
                            </View>
                        </View>

                        <View style={styles.separador}></View>


                        <View style={styles.table_tiles} >
                            <Text style={styles.table_tile_text_2}>Released: { movie.release_date }</Text>
                        </View>

                        <View style={styles.table_tiles} >
                            <Image style={styles.table_tile_image} source={img_star_filled} />
                            <Text style={styles.table_tile_text}>{ movie.vote_average }</Text>
                        </View>
                    </View>
                    

                    
                    

                    <Text style={styles.description}>{movie.overview}</Text>

                    
                    <View style={ styles.subcontainer_grid }>
                    

                    {suggestedMovies.length > 0 ?     
                    <FlatList
                        ListHeaderComponent={() => ( <Text style={globalStyles.listHeaderTitle}>{"Suggested"}</Text> )}
                        ListHeaderComponentStyle={globalStyles.listHeader}
                        ListFooterComponent={() => ( <Text style={globalStyles.listHeaderTitle}></Text> )}
                        ListFooterComponentStyle={globalStyles.listFooter}
                        data={suggestedMovies}
                        numColumns={2}
                        nestedScrollEnabled={false}
                        renderItem={({ item, index }) => (

                            <CardViewWithImage 
                                key={item.id}
                                source={ {uri:  Configs.MOVIEDB_POSTERS_PATH + item.poster_path } }
                                contentFontSize={ 10 }
                                titleFontSize={ 12 }
                                content={ 
                                    <Text style={styles.card_title}>
                                        { item.overview.length < 60? item.overview : item.overview.substring(0, 59) + "..." }
                                    </Text>
                                }
                                title={ <Text style={styles.card_title}>{item.title}</Text> }
                                imageWidth={ '100%' }
                                imageHeight={ 160 }
                                width={ (Dimensions.get("screen").width / 2) - 10}
                                height={ 200 }
                                roundedImage={ false }
                                 onPress={ 
                                    () => this.props.navigation.push('detailsScreen', {
                                        screen: "PlaceDetails",
                                        params: { id: item.id },
                                    }
                                )} 
                                style={ styles.miniCardStyle }
                            />
                        )}
                    />
                    :null }

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
    header_images: {
        width: '95%',
        height: 400,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 20,
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
        overflow: 'hidden'
    },
    header_tiles: {
        width: '100%',
        marginVertical: 16,
        paddingHorizontal: 8,
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    separador: {
        width: '100%',
        height: 1,
        backgroundColor: '#DDD',
        marginBottom: 8,
    },
    header_tiles_col_left: {
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    header_tiles_col_center: {
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 'auto',
        width: '100%',
    },
    header_tiles_col_right: {
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent: 'flex-end',
        marginLeft: 'auto'
    },
    tile_image_type: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    tile_image_actions: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
    tile_image_button: {
        backgroundColor: Colors.CONTAINER_COLOR,
        padding: 10,
        marginHorizontal: 8,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#555',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.3,
    },
    tile_text_type: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 20,
        //fontWeight: 'bold',
        marginTop: 0,
        marginLeft: 8,
    },
    table_tiles_container: {
        backgroundColor: Colors.CARD_TABLE_TILES,
        borderRadius: 10,
        marginHorizontal: 12,
        elevation: 2,
        //shadowOffset: { width: -100, height: 100},
        paddingVertical: 10,
        shadowColor: '#555',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.3,
    },
    table_tiles: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginHorizontal: 10,
        marginVertical: 2, 
    },
    table_tile_image: {
        height:  '100%',
        width: 20,
        opacity: 0.7,
        resizeMode: 'contain',
        marginRight: 13,
        marginLeft: 3,
    },
    table_tile_text: {
        color: Colors.CARD_TABLE_TILES_TEXT,
        fontSize: 18,
        //fontWeight: 'bold',
        width: Dimensions.get('window').width - 100
    },
    table_tile_text_2: {
        color: Colors.CARD_TABLE_TILES_TEXT,
        fontSize: 17,
        //fontWeight: 'bold',
        width: Dimensions.get('window').width - 100
    },
    table_tile_text_true: {
        color: '#45adfd',
        fontSize: 18,
        //fontWeight: 'bold',
        width: Dimensions.get('window').width - 100
    },
    table_tile_text_false: {
        color: '#dd4c00',
        fontSize: 18,
        //fontWeight: 'bold',
        width: Dimensions.get('window').width - 100
    },
    title: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    description: {
        marginVertical: 10,
        marginHorizontal: 4,
        color: Colors.LABEL,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    starRatingZ: {
        marginTop: 20,
        width: 260,
        alignSelf: 'center',
        marginBottom: 50,
    },
    sublabel: {
        textAlign: 'center',
    },
    wrapper: {
        height: 600,  
    },
    btn_backArrow: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        padding: 10,
        width: 40,
        height: 40,
        marginLeft: 24,
        position: 'absolute',
        zIndex: 22,
        marginTop: 24,
    },
    btn_backArrow_img: {
        width: 20,
        height: 20,
    },
    scrollView: {

    },
    image_poster: {
        height: '100%',
        resizeMode: 'center',
    },
    image_poster_background: {
        height: '100%',
        resizeMode: '100%',
        position: 'absolute',
    },
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
        textColor: 'red'
    },
    card_title: {
        color: Colors.CARD_TEXT
    },
    subcontainer_grid : {
        alignItems   : "center",
        flexDirection: "row",
        flexWrap     : 'wrap',
    },
});


export default Details;
