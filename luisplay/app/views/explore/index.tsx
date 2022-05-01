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
        const img_star_filled = (Appearance.getColorScheme() === 'dark' )? 
                            require("../../assets/images/img_star_filled_dark.png") 
                            : require("../../assets/images/img_star_filled.png");
    // STYLES
        const globalStyles = require('../../styles/globalStyles');



interface IProps {
    navigation: any
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
                                    <>
                                        <Text style={globalStyles.card_title}>
                                            { item.overview.length < 30? item.overview : item.overview.substring(0, 29) + "..." }
                                        </Text>
                                        <View style={globalStyles.card_table_tiles} >
                                            <Image style={globalStyles.card_table_tile_image} source={img_star_filled} />
                                            <Text style={globalStyles.card_table_tile_text}>{ item.vote_average.toFixed(1) }</Text>
                                        </View>
                                    </>
                                }
                                title={ <Text style={globalStyles.card_title}>{item.title}</Text> }
                                imageWidth={ '100%' }
                                imageHeight={ 200 }
                                width={ (Dimensions.get("screen").width / 2) - 10}
                                height={ 310 }
                                roundedImage={ false }
                                 onPress={ 
                                    () => this.props.navigation.navigate('detailsScreen', {
                                        screen: "PlaceDetails",
                                        params: { id: item.id },
                                    }
                                )} 
                                style={ globalStyles.miniCardStyle }
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
});


export default Explore;