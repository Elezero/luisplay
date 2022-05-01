import Configs from "../settings/configs";
import Request from "./base";


export default new Request( '', "https://api.themoviedb.org/3/", 'api_key', Configs.MOVIEDB_TOKEN);


