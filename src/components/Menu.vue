<template>
  <div class="row d-flex justify-content-center mt-3">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
          <img src="https://1.bp.blogspot.com/-VB4jeC7zyd0/YJWRGcDXVZI/AAAAAAAAFgg/47etyklgLrc5hfChNJqjR-DMVSxLCMIVQCLcBGAsYHQ/s600/mascara-spiderman-png-transparente.png" height="50px">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="'/home'">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Géneros
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-for="(genero, index) in generos" :key="index">
                    <router-link class="dropdown-item" :to="'/generos/' + genero.idGenero">{{genero.nombre}}</router-link>
                </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Nacionalidad
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-for="(nac, index) in nacionalidades" :key="index">
                    <router-link class="dropdown-item" :to="'/nacionalidades/'+ nac.idNacionalidad">
                        {{nac.nombre}} <img :src="nac.bandera" height="30px">
                    </router-link>
                </li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" v-on:submit.prevent="buscarPeliculas()">
          <input class="form-control me-2" type="search" v-model="busqueda" name="busqueda" placeholder="Buscar peliculas" aria-label="Search">
          <button class="btn btn-outline-primary" type="submit">Buscar</button>
        </form>
      </div>
    </div>
  </nav>
  </div>
</template>

<script>
import GenerosService from '../services/GenerosService'
import NacionalidadesService from '../services/NacionalidadesService'

const generosService = new GenerosService();
const nacionalidadesService = new NacionalidadesService();

export default {
  name: "Menu",
  data() {
    return {
      generos: [],
      nacionalidades: [],
      busqueda: ""
    }
  },
  methods: {
    cargarDatos() {
      generosService.getGeneros().then(response => {
        this.generos = response;
      });
      nacionalidadesService.getNacionalidades().then(response => {
        this.nacionalidades = response;
      });
    },
    buscarPeliculas() {
      if (this.busqueda != "") {
        this.$router.push("/buscar/"+this.busqueda);
      }
    }
  }, 
  mounted() {
    this.cargarDatos();
  }

}
</script>

<style>

</style>