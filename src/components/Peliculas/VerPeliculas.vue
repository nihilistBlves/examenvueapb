<template>
  <div class="row d-flex justify-content-center mt-3 text-center">
    <DetallesPeliculaVue v-if="mostrarHijo" :pelicula="peliculaSeleccionada" :mostrar="mostrar" :recargarPeliculasPorGenero="cargarPorGenero" :recargarPeliculasPorNacionalidad="cargarPorNacionalidad"></DetallesPeliculaVue>
    <h1 v-if="generoActual">Ver peliculas de {{generoActual.nombre}}</h1>
    <h1 v-else-if="nacionalidadActual">Ver peliculas de {{nacionalidadActual.nombre}}</h1>
    <h1 v-else-if="busqueda">Ver peliculas por busqueda: {{busqueda}}</h1>
    <div class="col-6 text-center">
        <table class="table table-striped" v-if="peliculas">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>TITULO</th>
                    <th>ACCION</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pel, index) in peliculas" :key="index">
                    <td>{{pel.idPelicula}}</td>
                    <td>{{pel.titulo}}</td>
                    <td>
                        <button class="btn btn-outline-primary" v-on:click="seleccionarPelicula(pel)">Ver detalles</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="!peliculas">
            <h2>Loading...</h2>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import PeliculasService from '../../services/PeliculasService'
import DetallesPeliculaVue from './DetallesPelicula.vue';
import GenerosService from '../../services/GenerosService'
import NacionalidadesService from '../../services/NacionalidadesService'

const generosService = new GenerosService();
const nacionalidadesService = new NacionalidadesService();

const peliculasService = new PeliculasService();

export default {
    name: "VerPeliculas",
    components: {
        DetallesPeliculaVue
    },
    data() {
        return{
            idGenero: "",
            idNacionalidad: "",
            peliculas: [],
            peliculaSeleccionada: {},
            mostrarHijo: false,
            generoActual: {},
            nacionalidadActual: {},
            busqueda: "",
        }
    },
    methods: {
        mostrar(estado) {
            this.mostrarHijo = estado;
        },
        seleccionarPelicula(pelicula) {
            this.peliculaSeleccionada = pelicula;
            this.mostrar(true);
        },
        cargarPorGenero() {
            peliculasService.getPeliculasByIdGenero(this.idGenero).then(response => {
                this.peliculas = response;
            });
        },
        cargarPorNacionalidad() {
            peliculasService.getPeliculasByIdNacionalidad(this.idNacionalidad).then(response => {
                this.peliculas = response;
            });
        },
        cargarPorBusqueda() {
            peliculasService.getPeliculasByQuery(this.busqueda).then(response => {
                this.peliculas = response;
            });
        }
    },
    mounted() {
        if (this.$route.params.idGenero) {
            this.idGenero = this.$route.params.idGenero;
            generosService.getGeneroById(this.idGenero).then(response => {
                    this.generoActual = response;
            });
            this.nacionalidadActual = null;
            this.cargarPorGenero();
        } else if (this.$route.params.idNacionalidad) {
            this.idNacionalidad = this.$route.params.idNacionalidad;
            this.cargarPorNacionalidad();
            nacionalidadesService.getNacionalidadById(this.idNacionalidad).then(response => {
                    this.nacionalidadActual = response;
            });
            this.generoActual = null;
        } else if (this.$route.params.busqueda) {
            this.busqueda = this.$route.params.busqueda;
            this.generoActual = null;
            this.nacionalidadActual = null;
            this.cargarPorBusqueda();
        }
    },
    watch: {
        '$route.params.idGenero'(next, prev) {
            if (next != prev) {
                this.idGenero = this.$route.params.idGenero;
                generosService.getGeneroById(this.idGenero).then(response => {
                    this.generoActual = response;
                });
                this.nacionalidadActual = null;
                this.cargarPorGenero();
                this.mostrar(false);
            }
        },
        '$route.params.idNacionalidad'(next, prev) {
            if (next != prev) {
                this.idNacionalidad = this.$route.params.idNacionalidad;
                nacionalidadesService.getNacionalidadById(this.idNacionalidad).then(response => {
                    this.nacionalidadActual = response;
                });
                this.generoActual = null;
                this.cargarPorNacionalidad();
                this.mostrar(false);
            }
        },
        '$route.params.busqueda'(next, prev) {
            if (next != prev) {
                this.busqueda = this.$route.params.busqueda;
                this.cargarPorBusqueda();
                this.mostrar(false);
            }
        }
    }
}
</script>

<style>

</style>