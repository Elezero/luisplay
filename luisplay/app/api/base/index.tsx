import axios from 'axios';
import { Service } from 'axios-middleware';


const base = 'https://reqres.in/api/';
const _headers = {};


// SAME Service for both APIS using this middleware


class Register {
    static instance: any = null;

    constructor() {
        if (Register.instance != null) return Register.instance; // SINGLETON
        
        Register.instance = this;
    }

    onResponse(response: any){
        const _response = JSON.parse(response.data);
        return _response;
    }
}




class Request {
    url: string;
    baseURL: string;
    request: any;
    key_name: string;
    key_token: string;

    constructor(url: string, baseURL: string, key_name: string = '', key_token: string = ''){
        this.url = url;
        this.baseURL = baseURL || base;
        this.request = axios.create({
            baseURL: this.baseURL, headers: _headers
        });

        this.key_name = key_name;
        this.key_token = key_token;

        const service = new Service(this.request);
        service.register(new Register());
    }


   


    /** --------------------
     * 
     * METHODS WITH INNER URL
     * Ex:    GET -> listPagged('movies/popular', 2)
     * 
     */
    list(inner_url='') {
        return this.request({ url: this.url+inner_url, method: 'GET' });
    }
    
    listPagged(inner_url: string = '', page: number = 0) {
        return this.request({ 
            url: this.url+inner_url+"?page="+page+(this.key_name != ''? ("&"+this.key_name+"="+this.key_token) : ''), 
            method: 'GET' 
        });
    }

    searchPagged(inner_url: string = '', text: string, page: number = 0) {
        return this.request({ 
            url: this.url+inner_url+"?query="+text+"?page="+page+(this.key_name != ''? ("&"+this.key_name+"="+this.key_token) : ''), 
            method: 'GET' 
        });
    }

    get(inner_url:string = '', id={idname: "", id: ""}){
        return this.request({ url: this.url+inner_url+"?"+id.idname+"="+id.id, data: '', method: 'GET' });
    }

    post(inner_url:string = '', object: any){
        return this.request({ url: this.url+inner_url, data: object, method: 'POST' });
    }

    put(inner_url:string = '', identified_object: any){
        return this.request({ url: this.url+inner_url, data: identified_object, method: 'PUT' });
    }

    delete(inner_url:string = '',identified_object: any){
        return this.request({ url: this.url+inner_url, data: identified_object, method: 'DELETE'});
    }
}


export default Request

