<template>
  <div class="row d-flex justify-content-center mt-3 mb-3">
    <div class="col-6 text-center">
        <div class="card" v-if="pelicula">
            <img :src="pelicula.foto" class="card-img-top" height="200px">
            <div class="card-body">
              <h4 class="card-title">{{pelicula.titulo}}</h4>
              <h5 class="card-text text-muted" v-if="peliculaGenero">Género: {{peliculaGenero.nombre}}</h5>
              <p class="card-text">{{pelicula.argumento}}</p>
              <button v-on:click="mostrarFrameVideo()" class="btn btn-danger">YouTube</button>
              <div class="embed-responsive embed-responsive-1by1 mt-3" v-if="mostrarVideo">
                <iframe class="embed-responsive-item" :src="getVideoFrame(pelicula.enlaceVideo)"></iframe>
              </div>
            </div>
            <!-- FOOTER MODIFICAR GENERO -->
            <div class="card-footer">
                <h5 class="card-title">Modificar género</h5>
                <form v-on:submit.prevent="modificarGenero()">
                    <select class="form-select mb-3" v-model="selectedGenero">
                        <option v-for="(gen, index) in generos" :key="index" :value="gen.idGenero">{{gen.nombre}}</option>
                    </select>
                    <button class="btn btn-primary">Modificar</button>
                </form>
            </div>
            <!-- FOOTER ELIMINAR -->
            <div class="card-footer">
                <h5 class="card-title">Eliminar película</h5>
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#eliminarModal">Eliminar</button>
                  <div class="modal fade" id="eliminarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">¿Está seguro de querer eliminar la película?</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                          <button type="button" class="btn btn-danger" v-on:click="eliminarPelicula()" data-bs-dismiss="modal">Eliminar película</button>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        </div>
        <div v-if="!pelicula">
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
import GenerosService from '../../services/GenerosService'

const peliculasService = new PeliculasService();
const generosService = new GenerosService();

export default {
    name: "DetallesPelicula",
    data() {
        return {
            peliculaMontada: {},
            peliculaGenero: {},
            generos: [],
            selectedGenero: "",
            mostrarVideo: false,
        }
    },
    props: {
        mostrar: Function,
        recargarPeliculasPorGenero: Function,
        recargarPeliculasPorNacionalidad: Function,
        pelicula: Object
    },
    methods: {
        cargarGeneros() {
            generosService.getGeneros().then(response =>{
                this.generos = response;
            });
        },
        modificarGenero() {
            peliculasService.putPeliculaGenero(this.peliculaMontada.idPelicula, this.selectedGenero).then(() => {
                this.$router.push("/generos/"+this.selectedGenero);
            });
        },
        eliminarPelicula() {
            peliculasService.eliminarPelicula(this.peliculaMontada).then(() => {
                if(this.$route.params.idGenero) {
                    this.recargarPeliculasPorGenero();
                    this.mostrar(false);
                } else if (this.$route.params.idNacionalidad) {
                    this.recargarPeliculasPorGenero(this.$route.params.idNacionalidad);
                    this.mostrar(false);
                }
            });
        }
    },
    mounted() {
        this.peliculaMontada = this.pelicula;
        this.cargarGeneros();
        generosService.getGeneroById(this.$route.params.idGenero).then(response => {
            this.peliculaGenero = response;
        });
    }
}
</script>

<style>

</style>