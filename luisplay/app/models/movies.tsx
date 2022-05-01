import IDates from "./dates";
import IMovie from "./movie";

interface IMovies {
    dates: IDates;
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export default IMovies;