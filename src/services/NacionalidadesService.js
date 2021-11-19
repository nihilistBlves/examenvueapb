import axios from 'axios';
import Global from '../components/Global'

export default class NacionalidadesService {
    getNacionalidades() {
        return new Promise(function(resolve) {
            var request = "api/nacionalidades";
            var url = Global.url + request;
            axios.get(url).then(response => {
                resolve(response.data);
            });
        });
    }

    getNacionalidadById(idNacionalidad) {
        return new Promise(function(resolve) {
            var request = "api/nacionalidades/" + idNacionalidad;
            var url = Global.url + request;
            axios.get(url).then(response => {
                resolve(response.data);
            });
        });
    }
}