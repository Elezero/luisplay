import React from 'react';
import {Component} from 'react';
import { View, StyleSheet, FlatList, Text,
            SafeAreaView, Dimensions, ActivityIndicator, Image, Appearance } from 'react-native';
import { CardViewWithImage } from "react-native-simple-card-view";

// SETTINGS
import Configs from '../../settings/configs';

// API 
import movies_service from '../../api/movies';

// MODELS/INTERFACES
import IMovies from '../../models/movies';
import IMovie from '../../models/movie';


// COMPONENTS
import CustomHeader from '../../components/customHeader';

// COLORS 
import Colors from '../../styles/colors';

// ASSETS 
    // IMAGES
        const icon_transparent = (Appearance.getColorScheme() === 'dark' )? 
                                    require("../../assets/images/icon_transparent_dark.png") 
                                    : require("../../assets/images/icon_transparent.png");
    // STYLES
        const globalStyles = require('../../styles/globalStyles');



interface IProps {
}
interface IState {
    
    isLoading: boolean,
    isSearching: boolean,
    textSearching: string,

    totalPages: number,
    currentPage: number;
    movies: IMovie[],
}

class Explore extends Component<IProps, IState> {
    constructor(props: any){
        super(props);

        this.state = {
            
            isLoading: false,
            
            isSearching: false,
            textSearching: "",

            totalPages: 1,
            currentPage: 0,
            movies: [],
        };


        // Bind functions
        this.getPlaces = this.getPlaces.bind(this);
        this.toggleSearching = this.toggleSearching.bind(this);
        this.setTextSearching = this.setTextSearching.bind(this);
    }


    
    // -
    componentDidMount() {
        this.getPlaces();
    }


    toggleSearching() {
        const { isSearching } = this.state;
        
        this.setState({ 
            isSearching: !isSearching,
            currentPage: 0,
            totalPages: 1,
            movies: [],
        }, 
            () => this.getPlaces()
        );
    }

    setTextSearching(val: string) {
        this.setState({
            textSearching: val,
            currentPage: 0,
            totalPages: 1,
            movies: [],
        },
            ()=> this.getPlaces()
        );
    }
    


    


    getPlaces() {
        const {totalPages, currentPage, movies, isSearching, textSearching} = this.state;

        let newpage = currentPage + 1;

        console.log("GETTING, page: "+newpage+"totalPages: "+totalPages);

        if(newpage > totalPages){
            console.log("LIMIT REACHED");
            return;
        }

        this.setState({ isLoading: true});


        if(isSearching){
            movies_service.searchPagged('search/movie', textSearching, newpage)
            .then((response_movies_list: IMovies) => {
                console.log({response_movies_list});

                this.setState({
                    movies: [...movies, ...response_movies_list.results],
                    currentPage: newpage,
                    isLoading: false,
                    totalPages: response_movies_list.total_pages,
                }, ()=> {
                    
                })
    
            }).catch((error: any) => {
                  
                console.log(error);
                
                this.setState({ isLoading: false });
            });
        } else{
            movies_service.listPagged('movie/popular', newpage)
            .then((response_movies_list: IMovies) => {
                console.log({response_movies_list});
                
                this.setState({
                    movies: [...movies, ...response_movies_list.results],
                    currentPage: newpage,
                    isLoading: false,
                    totalPages: response_movies_list.total_pages,
                }, ()=> {
                    
                })
    
            }).catch((error: any) => {
                  
                console.log(error);
                
                this.setState({ isLoading: false });
            });
        }

        
    }
    
    

    render() {
        const { isLoading,  isSearching, movies } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <CustomHeader 
                    headerTitle={icon_transparent}
                    isSearching={isSearching}
                    setTextSearching={this.setTextSearching}
                    toggleSearching={this.toggleSearching}
                />

                { isLoading &&
                    <ActivityIndicator animating={isLoading}  size="large" color={Colors.PRIMARY_COLOR} style={globalStyles.loadingIndicator}/>
                }

                <View style={ styles.subcontainer_grid }>
                    

                    {movies.length > 0 ?     
                    <FlatList
                        ListHeaderComponent={() => ( <Text style={globalStyles.listHeaderTitle}>{ isSearching? "Results" :"Popular"}</Text> )}
                        ListHeaderComponentStyle={globalStyles.listHeader}
                        ListFooterComponent={() => ( <Text style={globalStyles.listHeaderTitle}></Text> )}
                        ListFooterComponentStyle={globalStyles.listFooter}
                        data={movies}
                        numColumns={2}
                        onEndReached={()=> this.getPlaces() }
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
                                /* onPress={ 
                                    () => this.props.navigation.navigate('DetailsStack', {
                                        screen: "PlaceDetails",
                                        params: { placePassed: placesRawOnGrid[index] },
                                    }
                                )} */
                                style={ styles.miniCardStyle }
                            />
                        )}
                    />
                    :null }

                </View>

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
    subcontainer_grid : {
        alignItems   : "center",
        flexDirection: "row",
        flexWrap     : 'wrap',
    },
    subcontainer_top_margined: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 50,
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
    }
});


export default Explore;