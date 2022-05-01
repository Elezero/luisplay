interface IMovie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
    first_air_date: string;
    name: string;
    tagline: string,
    //known_for
}

export default IMovie;