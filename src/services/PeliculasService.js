import axios from 'axios';
import Global from '../components/Global'

export default class PeliculasService {
    getPeliculasByIdGenero(idGenero) {
        return new Promise(function(resolve) {
            var request = "api/peliculas/peliculasgenero/" + idGenero;
            var url = Global.url + request;
            axios.get(url).then(response => {
                resolve(response.data);
            });
        });
    }

    getPeliculasByIdNacionalidad(idNacionalidad) {
        return new Promise(function(resolve) {
            var request = "api/peliculas/peliculasnacionalidad/" + idNacionalidad;
            var url = Global.url + request;
            axios.get(url).then(response => {
                resolve(response.data);
            });
        });
    }

    getPeliculasByQuery(busqueda) {
        return new Promise(function(resolve) {
            var request = "api/peliculas/buscadorpeliculas/" + busqueda;
            var url = Global.url + request;
            axios.get(url).then(response => {
                resolve(response.data);
            });
        });
    }

    putPeliculaGenero(idPelicula, idGenero) {
        return new Promise(function(resolve) {
            var request = "api/peliculas/updatepeliculagenero/" + idPelicula + "/" + idGenero;
            var url = Global.url + request;
            axios.put(url).then(response => {
                resolve(response.data);
            });
        });
    }

    eliminarPelicula(pelicula) {
        return new Promise(function(resolve) {
            var request = "api/peliculas/" + pelicula.idPelicula;
            var url = Global.url + request;
            axios.delete(url).then(response => {
                resolve(response.data);
            });
        });
    }
}