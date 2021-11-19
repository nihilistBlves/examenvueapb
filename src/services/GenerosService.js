import axios from 'axios';
import Global from '../components/Global'

export default class GenerosService {
    getGeneros() {
        return new Promise(function(resolve) {
            var request = "api/generos";
            var url = Global.url + request;
            axios.get(url).then(response => {
                resolve(response.data);
            });
        });
    }

    getGeneroById(idGenero) {
        return new Promise(function(resolve) {
            var request = "api/generos/" + idGenero;
            var url = Global.url + request;
            axios.get(url).then(response => {
                resolve(response.data);
            });
        });
    }
}